'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'

import { cn } from '@/utils/helper'

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ checked, className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                `aspect-square h-4 w-4 rounded-full border bg-white border-zentive-green-dark border-2 text-zentive-green-dark
         ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
         disabled:opacity-50 disabled:bg-zentive-gray-medium disabled:cursor-not-allowed `,
                className,
                {
                    // Conditionally apply these classes when checked is true
                    'bg-zentive-green-dark text-zentive-green-dark border-zentive-green-dark':
                        checked,
                    // Apply these classes when checked is false (optional)
                    'bg-white text-zentive-green-dark border-zentive-green-dark': !checked,
                },
            )}
            checked={checked}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
                <Circle className='h-2.5 w-2.5 fill-current text-current' />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
