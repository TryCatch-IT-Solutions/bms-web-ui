import * as React from 'react'

import { cn } from '@/utils/helper'
import { Label } from '../Label'
// import { useFormField } from '../Forms'
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, maxLength = 1000, ...props }, ref) => {
        /* const { invalid } = useFormField()
           comment ko muna sir Kel,
           kapag ginamit tong component na to sa hindi Form: 
           Cannot destructure property 'getFieldState' of 'useFormContext(...)' as it is null.
        */

        return (
            <div className='relative '>
                <textarea
                    className={cn(
                        'peer flex w-full rounded-[2px] border border-zentive-gray-medium static-input font-sans-pro placeholder:text-transparent bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',

                        className,
                    )}
                    maxLength={maxLength}
                    ref={ref}
                    {...props}
                    value={props.value || ''}
                />

                {maxLength && props.name !== 'notes' ? (
                    <p className='flex justify-end text-[12px] text-zentive-gray-medium'>
                        {props.value?.toString()?.length ?? 0}/{maxLength}
                    </p>
                ) : null}

                <Label
                    className={cn(
                        'floating-label bg-white absolute left-3 top-2 -translate-y-1/90 text-base duration-100 ease-linear peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:px-1',
                        props.disabled && props.value
                            ? 'text-[#676C75] peer-disabled:opacity-100'
                            : '',
                        props.value || props.autoFocus
                            ? 'peer-focus:text-zentive-green-dark pointer-events-auto -translate-y-4 text-sm px-1'
                            : 'peer-focus:text-zentive-green-dark text-zentive-gray-medium pointer-events-none',
                        // invalid
                        //     ? 'text-zentive-red-dark focus:text-zentive-red-dark peer-focus:text-zentive-red-dark split-color'
                        //     : 'pointer-events-none peer-focus:text-zentive-green-dark',
                    )}
                >
                    {props.placeholder}
                </Label>
            </div>
        )
    },
)
Textarea.displayName = 'Textarea'

export { Textarea }
