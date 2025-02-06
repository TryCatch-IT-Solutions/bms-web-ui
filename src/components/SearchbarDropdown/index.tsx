import * as React from 'react'

export interface Option<T> {
    value: T // The actual value of the option, can be string or number
    label: string // The text label to display
}

export type DropdownProps<T> = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: Option<T>[] // Array of Option objects
    isCurrency?: boolean
    placeholder?: string
    value?: T | null // Allow the value to be null or a specific value
    onChange?: (value: T) => void // Explicitly define onChange as accepting the correct type
}

const SearchBarDropdown = React.forwardRef<HTMLSelectElement, DropdownProps<any>>(
    ({ className, options, placeholder, value, isCurrency = false, onChange, ...props }, ref) => {
        // Handle the change event and cast the value to the correct type
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedValue = event.target.value

            // Check if we need to parse the value as a number
            const parsedValue = isNaN(Number(selectedValue)) ? selectedValue : Number(selectedValue)

            // Call onChange with the correctly parsed value
            if (onChange) {
                onChange(parsedValue)
            }
        }

        return (
            <div className='relative'>
                {/* Render currency symbol if isCurrency is true */}
                {isCurrency && value && (
                    <p className='absolute transform -translate-y-1/2 top-[47%] pl-3'>$</p>
                )}

                <select
                    ref={ref}
                    value={value ?? ''} // Ensure that value is either the selected value or empty string
                    onChange={handleChange}
                    className={`peer flex h-[45px] xs:h-[35px] w-full text-base xs:text-sm rounded-sm border border-gray-300 placeholder:text-transparent bg-transparent px-3 shadow-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-gray-300 ${className} ${
                        isCurrency ? 'pl-5' : ''
                    }`}
                    {...props}
                >
                    {/* Render the placeholder if it's provided and no value is selected */}
                    {placeholder && !value && (
                        <option value='' disabled>
                            {placeholder}
                        </option>
                    )}
                    {/* Map over the options and create an <option> element for each */}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        )
    },
)

SearchBarDropdown.displayName = 'SearchBarDropdown'

export { SearchBarDropdown }
