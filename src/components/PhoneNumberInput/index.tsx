import PhoneInput, { Value, parsePhoneNumber } from 'react-phone-number-input'
import { cn } from '@/utils/helper'
import { CountryCode, E164Number } from 'libphonenumber-js/core'
import 'react-phone-number-input/style.css'
import { Label } from '../Label'
import { useFormField } from '../Form'
import { forwardRef, useState } from 'react'

type PhoneNumberInputProps = {
    className?: string
    disabled?: boolean
    name: string
    defaultCountry?: CountryCode
    value: string
    inputProps: {
        name: string
        placeholder?: string
    }
    limitMaxLength?: boolean
    maxLength?: number
    smartCaret?: boolean
    isError?: boolean
    onBlur: () => void
    onChange: (value: string) => void
}

export const PhoneNumberInput = forwardRef((props: PhoneNumberInputProps, forwardRef) => {
    const { invalid } = useFormField()
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const handleOnChange = (phoneNumber: Value) => {
        if (phoneNumber) {
            const parsedPhoneNumber = parsePhoneNumber(phoneNumber)
            const formattedNumber = parsedPhoneNumber
                ? parsedPhoneNumber.format('E.164')
                : phoneNumber

            props.onChange(
                formattedNumber.startsWith('+') ? formattedNumber : `+${formattedNumber}`,
            )
        } else {
            props.onChange('')
        }
    }

    return (
        <div className='relative'>
            <PhoneInput
                className={cn(
                    'w-full border border-bms-gray-dark h-[45px] peer px-3 rounded-sm',
                    isFocused && !invalid && 'border-bms-gray-500',
                    invalid && 'border-zentive-red-dark',
                    props.disabled && 'bg-zentive-gray-light text-zentive-gray-medium',
                    props.className,
                )}
                // Entering phone numbers outside US do not behave well
                defaultCountry='PH'
                withCountryCallingCode
                countrySelectProps={{
                    disabled: true,
                    arrowComponent: () => null,
                }}
                value={props.value as E164Number}
                onBlur={() => {
                    setIsFocused(false)
                    props.onBlur()
                }}
                onChange={handleOnChange}
                onFocus={() => setIsFocused(true)}
                limitMaxLength={true}
                numberInputProps={{
                    className: 'focus-visible:outline-none',
                    name: props.name,
                    maxLength: 16,
                    ref: forwardRef,
                }}
                smartCaret={true}
                disabled={props.disabled}
            />
            <Label
                className={cn(
                    'floating-label absolute left-12 top-1/2 -translate-y-1/2 text-base text-bms-gray-medium duration-100 ease-linear peer-has-[:focus]:left-3 peer-has-[:focus]:-translate-y-[2.15rem] peer-has-[:focus]:text-sm peer-has-[:focus]:px-1 split-color pointer-events-none',

                    // with value
                    props.value && ' text-sm -translate-y-[2.15rem] left-3 px-1',
                    //
                    invalid ? 'text-zentive-red-dark' : 'peer-has-[:focus]:text-zentive-green-dark',
                    props?.disabled && 'split-color-disabled',
                )}
            >
                {props.inputProps.placeholder}
            </Label>
        </div>
    )
})

export default PhoneNumberInput
