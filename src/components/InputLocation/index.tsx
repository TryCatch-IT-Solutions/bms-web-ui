import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Input, InputProps } from '@/components/Input'
import { FullAddress } from '@/hooks/useGeocode'
import debounce from 'debounce'

type InputLocationProps = Omit<InputProps, 'type'> & {
    onPlaceSelected: (options: FullAddress) => void
    autocompleteType: 'address' | 'postal_code' | '(cities)' | '(regions)'
    isLoaded: boolean
}

const getComponentLongName = (
    addressComponents: google.maps.GeocoderAddressComponent[] | undefined,
    type: string,
): string => {
    if (!addressComponents) return ''

    const component = addressComponents.find((comp) => comp.types.includes(type))
    return component ? component.long_name.trim() : ''
}

const getCity = (place: google.maps.places.PlaceResult): string => {
    const city = getComponentLongName(place.address_components, 'locality')
    if (city) return city

    // Fallback to sublocality if locality is not found
    const sublocality = getComponentLongName(place.address_components, 'sublocality')
    if (sublocality) return sublocality

    const neighborhood = getComponentLongName(place.address_components, 'neighborhood')
    return neighborhood ? neighborhood : ''
}

const getState = (place: google.maps.places.PlaceResult): string =>
    getComponentLongName(place.address_components, 'administrative_area_level_1')

const getStreetAddress = (place: google.maps.places.PlaceResult) => {
    const streetNumber = getComponentLongName(place.address_components, 'street_number')
    const streetName = getComponentLongName(place.address_components, 'route')

    return `${streetNumber} ${streetName}`.trim()
}

const getZipCode = (place: google.maps.places.PlaceResult): string =>
    getComponentLongName(place.address_components, 'postal_code')

const InputLocation = forwardRef<HTMLInputElement, InputLocationProps>(
    ({ onPlaceSelected, autocompleteType, isLoaded, ...props }, forwardedRef) => {
        // const { isLoaded } = useJsApiLoader({ googleMapsApiKey, libraries })

        const inputRef = useRef<HTMLInputElement>(null)
        const autocomplete = useRef<google.maps.places.Autocomplete>()

        useImperativeHandle(forwardedRef, () => inputRef.current!)

        useEffect(() => {
            if (inputRef.current && isLoaded) {
                const autocompleteOptions: google.maps.places.AutocompleteOptions = {
                    types: [autocompleteType],
                    // componentRestrictions: { country: ['us', 'ph'] },
                }

                autocomplete.current = new google.maps.places.Autocomplete(
                    inputRef.current,
                    autocompleteOptions,
                )

                const debouncedPlaceChanged = debounce(async () => {
                    if (autocomplete.current) {
                        const place = autocomplete.current.getPlace()
                        if (!place.geometry) {
                            console.log('Returned place contains no geometry')
                        }

                        requestAnimationFrame(() => {
                            const city = getCity(place)
                            const state = getState(place)
                            const streetAddress = getStreetAddress(place)
                            const zipCode = getZipCode(place)

                            onPlaceSelected({ streetAddress, city, state, zipCode })
                        })
                    }
                }, 500)

                autocomplete.current.addListener('place_changed', debouncedPlaceChanged)

                return () => {
                    debouncedPlaceChanged.clear()
                    google.maps.event.clearInstanceListeners(autocomplete)
                }
            }
        }, [isLoaded])

        useEffect(() => {
            if (autocomplete.current) {
                const pacContainer = document.getElementsByClassName('pac-container')[0]

                if (pacContainer) {
                    pacContainer.setAttribute('display', 'block !important')
                }
            }
        }, [autocomplete])

        return (
            <Input
                {...props}
                ref={inputRef}
                type='text'
                className='bg-white pl-3 text-base h-11 rounded-sm'
            />
        )
    },
)

export { InputLocation }
