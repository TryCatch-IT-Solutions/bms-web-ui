import { ChangeEvent, forwardRef, useMemo } from 'react'
import PlacesAutocomplete, { geocodeByAddress, Suggestion } from 'react-places-autocomplete'
import { InputAddressProps } from '..'
import { getSegmentedAddress } from '@/utils/address'
import { useFormField } from '@/components/Forms'
import { cn } from '@/utils/helper'
import FloatingLabel from '@/components/FloatingLabel'

const SEARCH_OPTIONS = {
    types: ['address'],
}

type PlacesAutocompleteDropdownProps<T> = {
    loading: boolean
    suggestions: readonly Suggestion[]
    getSuggestionItemProps: <SuggestionProps extends {}>(
        suggestion: Suggestion,
        options?: SuggestionProps,
    ) => T
}

const PlacesAutocompleteDropdown = <T,>({
    loading,
    suggestions,
    getSuggestionItemProps,
}: PlacesAutocompleteDropdownProps<T>) => {
    if (loading) {
        return <div className='absolute bg-white z-[10]'>Loading...</div>
    }

    return (
        <div className='absolute bg-red-200 z-[10] w-full'>
            {suggestions.map((suggestion) => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                    <div
                        {...getSuggestionItemProps(suggestion, {
                            className: cn(className, 'w-full bg-red-200'),
                            style,
                        })}
                        key={suggestion.description}
                    >
                        <span>{suggestion.description}</span>
                    </div>
                )
            })}
        </div>
    )
}

const WrappedInputAddress = forwardRef<HTMLInputElement, InputAddressProps>(
    ({ onPlaceSelected, className, ...props }, forwardedRef) => {
        const { invalid } = useFormField()

        const handleSelect = async (address: string) => {
            try {
                const res = await geocodeByAddress(address)

                onPlaceSelected(getSegmentedAddress(res[0].address_components))
            } catch (err) {
                const geocodeErr = err as keyof typeof google.maps.GeocoderStatus
                if (geocodeErr in google.maps.GeocoderStatus) {
                    console.error('geocode error: ', geocodeErr)
                }
            }
        }

        const handlePlacesAutocompleteChange = (value: string) => {
            props.onChange?.({ target: { value } } as ChangeEvent<HTMLInputElement>)
        }

        const value = (props?.value ?? '') as string

        const inputClassName = useMemo(
            () =>
                cn(
                    'peer flex h-[45px] w-full rounded-sm border border-zentive-gray-medium placeholder:text-transparent bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-zentive-gray-medium',
                    invalid ? 'border-destructive' : 'focus:border focus:border-zentive-green-dark',
                    className,
                ),
            [className, invalid],
        )

        return (
            <PlacesAutocomplete
                debounce={300}
                onChange={handlePlacesAutocompleteChange}
                onSelect={handleSelect}
                searchOptions={SEARCH_OPTIONS}
                value={value}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                    type GetSuggestionItemPropsType = ReturnType<typeof getSuggestionItemProps>

                    return (
                        <div className='relative'>
                            <input
                                {...props}
                                {...getInputProps({ className: inputClassName })}
                                ref={forwardedRef}
                            />

                            <FloatingLabel {...props} invalid={invalid} value={value} />
                            <PlacesAutocompleteDropdown<GetSuggestionItemPropsType>
                                loading={loading}
                                suggestions={suggestions}
                                getSuggestionItemProps={getSuggestionItemProps}
                            />
                        </div>
                    )
                }}
            </PlacesAutocomplete>
        )
    },
)

export default WrappedInputAddress
