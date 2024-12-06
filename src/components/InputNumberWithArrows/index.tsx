import { cn } from '@/utils/helper'
import { FaSortDown, FaSortUp } from 'react-icons/fa'
import { useFormField } from '../Forms'
import React from 'react'
import { Label } from '../Label'

const InputNumberWithArrows = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, placeholder, value, ...props }, ref) => {
    const { invalid } = useFormField()
    const numberValue = value ? parseFloat(value as string) : 0

    const increment = () => {
        const newValue = numberValue + 1

        if (props.onChange) {
            props.onChange({
                target: { value: newValue.toString() },
            } as React.ChangeEvent<HTMLInputElement>)
        }
    }

    const decrement = () => {
        if (numberValue > 0) {
            const newValue = numberValue - 1

            if (props.onChange) {
                props.onChange({
                    target: { value: newValue.toString() },
                } as React.ChangeEvent<HTMLInputElement>)
            }
        }
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value

        if (props.onChange) {
            props.onChange({
                target: { value: newValue.toString() },
            } as React.ChangeEvent<HTMLInputElement>)
        }
    }

    return (
        <div className='relative'>
            <input
                type='text'
                className={cn(
                    'peer flex h-[45px] w-full rounded-sm border border-zentive-gray-medium placeholder:text-transparent bg-transparent pl-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-zentive-gray-medium',
                    invalid ? 'border-zentive-red-dark' : 'focus:border-zentive-green-dark',
                    className,
                )}
                value={value}
                // placeholder={placeholder}
                onChange={handleNumberChange}
                ref={ref}
                {...props}
            />
            <div className='absolute right-2 top-0 bottom-0 flex flex-col gap-0 '>
                <button
                    type='button'
                    onClick={increment}
                    className='overflow-hidden flex-1 h-[22.5px] text-[30px] pt-6 text-zentive-gray-medium flex items-center justify-center hover:cursor-default'
                >
                    <FaSortUp className='active:text-zentive-gray-dark active:duration-75 active:scale-90 transition-transform' />
                </button>
                <button
                    type='button'
                    onClick={decrement}
                    className='overflow-hidden flex-1 h-[22.5px] text-[30px] pb-6  text-zentive-gray-medium flex items-center justify-center hover:cursor-default'
                >
                    <FaSortDown className='active:text-zentive-gray-dark active:duration-75 active:scale-90 transition-transform' />
                </button>
            </div>

            <Label
                className={cn(
                    'floating-label absolute left-3 top-1/2 -translate-y-1/2 text-base text-zentive-gray-medium duration-100 ease-linear peer-focus:-translate-y-[2.15rem] peer-focus:text-sm peer-focus:px-1 split-color pointer-events-none',
                    // with value
                    value && ' text-sm -translate-y-[2.15rem] px-1',
                    //
                    invalid
                        ? 'text-zentive-red-dark text-sm -translate-y-[2.15rem] px-1'
                        : 'peer-focus:text-zentive-green-dark',
                    props.disabled && 'split-color-disabled',
                )}
            >
                {placeholder}
            </Label>
        </div>
    )
})

InputNumberWithArrows.displayName = 'InputNumberWithArrows'

export { InputNumberWithArrows }
