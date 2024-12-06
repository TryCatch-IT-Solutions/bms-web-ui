import { FullAddress } from '@/hooks/useGeocode'

// Functions for extracting address components information from Google Maps API's Places library
const getComponentLongName = (
    addressComponents: google.maps.GeocoderAddressComponent[] | undefined,
    type: string,
): string => {
    if (!addressComponents) return ''

    const component = addressComponents.find((comp) => comp.types.includes(type))
    return component ? component.long_name.trim() : ''
}

const getCity = (addressComponents: google.maps.GeocoderAddressComponent[]): string => {
    const city = getComponentLongName(addressComponents, 'locality')
    if (city) return city

    const postalTown = getComponentLongName(addressComponents, 'postal_town')
    if (postalTown) return postalTown

    const sublocality = getComponentLongName(addressComponents, 'sublocality')
    if (sublocality) return sublocality

    const neighborhood = getComponentLongName(addressComponents, 'neighborhood')
    return neighborhood ? neighborhood : ''
}

const getState = (addressComponents: google.maps.GeocoderAddressComponent[]): string => {
    const state = getComponentLongName(addressComponents, 'administrative_area_level_1')
    if (state) return state

    const region = getComponentLongName(addressComponents, 'administrative_area_level_2')
    return region ? region : ''
}

const getStreetAddress = (addressComponents: google.maps.GeocoderAddressComponent[]): string => {
    const streetNumber = getComponentLongName(addressComponents, 'street_number')
    const streetName = getComponentLongName(addressComponents, 'route')

    const subpremise = getComponentLongName(addressComponents, 'subpremise') // for apartment numbers or suite numbers

    return `${streetNumber} ${streetName}${subpremise ? ', ' + subpremise : ''}`.trim()
}

const getZipCode = (addressComponents: google.maps.GeocoderAddressComponent[]): string => {
    const zipCode = getComponentLongName(addressComponents, 'postal_code')
    if (zipCode) return zipCode

    const postalCodeSuffix = getComponentLongName(addressComponents, 'postal_code_suffix')
    return postalCodeSuffix ? postalCodeSuffix : ''
}
export const getSegmentedAddress = (
    addressComponents: google.maps.GeocoderAddressComponent[],
): FullAddress => {
    const city = getCity(addressComponents)
    const state = getState(addressComponents)
    const streetAddress = getStreetAddress(addressComponents)
    const zipCode = getZipCode(addressComponents)

    return {
        city,
        state,
        streetAddress,
        zipCode,
    }
}
