import * as React from 'react'
import { Label } from '../Label'
import { useFormField } from '../Form'
import { cn } from '@/utils/helper'

export type CustomInputTypes = 'full-date' | 'card' | 'dates' | 'otp'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    isCurrency?: boolean
    isNumberRestricted?: boolean
    maxLength?: number
    type: React.HTMLInputTypeAttribute | CustomInputTypes
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, placeholder, type, value, isCurrency = false, ...props }, ref) => {
        const { invalid } = useFormField()

        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (type === 'number' && props.isNumberRestricted) {
                if (event.key !== 'Backspace' && (event.key < '0' || event.key > '9')) {
                    // Comment out muna natin tong si event.preventDefault, di kasi makalipat sa next input field after mag tab
                    // event.preventDefault()
                }
            }

            if (type === 'number' && event.key === 'e') {
                event.preventDefault()
            }
        }

        return (
            <div className='relative'>
                <>
                    {isCurrency && !!value && (
                        <p className='absolute transform -translate-y-1/2 top-[47%] pl-3'>$</p>
                    )}

                    <input
                        type={type}
                        className={cn(
                            'peer flex h-[45px] w-full text-base rounded-sm border border-bms-gray-300 placeholder:text-transparent bg-transparent px-3 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-bms-gray-medium',
                            invalid
                                ? 'border-bms-primary'
                                : 'focus:border focus:border-bms-gray-500',
                            type === 'date' && !value && 'text-transparent focus:text-inherit',
                            className,
                            isCurrency ? 'pl-5' : '',
                        )}
                        placeholder={placeholder}
                        onKeyDown={handleKeyDown}
                        ref={ref}
                        value={value || ''}
                        {...props}
                        {...(props.maxLength && { maxLength: undefined })}
                    />
                </>

                <Label
                    className={cn(
                        'floating-label absolute left-3 top-1/2 -translate-y-1/2 text-base text-bms-gray-medium duration-100 ease-linear peer-focus:-translate-y-[2.15rem] peer-focus:text-sm peer-focus:px-1 pointer-events-none',
                        // with value
                        value && 'split-color text-sm -translate-y-[2.15rem] px-1 bg-white',
                        !value && 'peer-focus:split-color bg-white',
                        //
                        invalid ? 'text-destructive split-color' : 'peer-focus:text-bms-gray-500',
                        props.disabled && 'split-color-disabled',
                    )}
                >
                    {placeholder}
                </Label>
            </div>
        )
    },
)

Input.displayName = 'Input'

export { Input }
