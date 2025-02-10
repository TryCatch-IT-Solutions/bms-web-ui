import * as React from 'react'
import { Label } from '../Label'
import { useFormField } from '../Form'
import { cn } from '@/utils/helper'

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    maxLength?: number
    rows?: number
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, placeholder, value, rows = 4, ...props }, ref) => {
        const { invalid } = useFormField()

        return (
            <div className='relative'>
                <textarea
                    className={cn(
                        'min-h-[8rem] max-h-[8rem] pt-2 peer w-full text-base xs:text-sm rounded-sm border border-bms-gray-300 placeholder:text-transparent bg-transparent px-3 shadow-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-bms-gray-medium',
                        invalid ? 'border-bms-primary' : 'focus:border focus:border-bms-gray-500',
                        className,
                    )}
                    placeholder={placeholder}
                    ref={ref}
                    value={value || ''}
                    rows={rows}
                    {...props}
                />

                <Label
                    className={cn(
                        'floating-label absolute left-3 top-1/2 -translate-y-1/2 text-base text-bms-gray-medium duration-100 ease-linear peer-focus:-translate-y-[4.2rem] peer-focus:text-sm peer-focus:px-1 pointer-events-none',
                        // with value
                        value && 'split-color text-sm -translate-y-[3.1rem] px-1 bg-white',
                        !value && 'peer-focus:split-color peer-focus:bg-white bg-transparent',
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

TextArea.displayName = 'TextArea'

export { TextArea }
