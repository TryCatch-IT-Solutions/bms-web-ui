import * as React from 'react'
import { Label } from '../Label'
import { cn } from '@/utils/helper'
import { useFormField } from '../Forms'
import InputMask from 'react-input-mask'
import { useMemo } from 'react'

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

        const toMask = ['card', 'tel', 'dates', 'otp', 'full-date']
        const mask = useMemo(() => {
            switch (type) {
                case 'date':
                    return '99/99/9999'
                case 'card':
                    return '9999 9999 9999 9999'
                case 'tel':
                    return props.maxLength === 11 ? '999-999-9999' : ''
                case 'dates':
                    return '99-99'
                case 'otp':
                    return '9  9  9  9  9  9'
                default:
                    return '999999999'
            }
        }, [])

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
                {toMask.includes(type) ? (
                    <InputMask
                        mask={mask}
                        type={type}
                        className={cn(
                            type === 'date'
                                ? 'text-center'
                                : 'peer flex h-[45px] w-full rounded-sm border border-zentive-gray-medium placeholder:text-transparent bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-zentive-gray-medium',
                            invalid
                                ? 'border border-destructive'
                                : 'focus:border focus:border-zentive-green-dark',
                            className,
                        )}
                        placeholder={placeholder}
                        onKeyDown={handleKeyDown}
                        value={value || ''}
                        {...props}
                        {...(props.maxLength && { maxLength: undefined })}
                    />
                ) : (
                    <>
                        {isCurrency && !!value && (
                            <p className='absolute transform -translate-y-1/2 top-[47%] pl-3'>$</p>
                        )}

                        <input
                            type={type}
                            className={cn(
                                'peer flex h-[45px] w-full text-base rounded-sm border border-zentive-gray-medium placeholder:text-transparent bg-transparent px-3 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-zentive-gray-medium',
                                invalid
                                    ? 'border-zentive-red-dark'
                                    : 'focus:border focus:border-zentive-green-dark',
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
                )}

                <Label
                    className={cn(
                        'floating-label absolute left-3 top-1/2 -translate-y-1/2 text-base text-zentive-gray-medium duration-100 ease-linear peer-focus:-translate-y-[2.15rem] peer-focus:text-sm peer-focus:px-1 pointer-events-none',
                        // with value
                        value && 'split-color text-sm -translate-y-[2.15rem] px-1',
                        !value && 'peer-focus:split-color bg-white',
                        //
                        invalid
                            ? 'text-destructive split-color bg-red-200'
                            : 'peer-focus:text-zentive-green-dark',
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
