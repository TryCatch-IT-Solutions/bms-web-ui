import { cn } from '@/utils/helper'
import { Label } from '../Label'
import { FC } from 'react'

type FloatingLabelProps = {
    invalid: boolean
    disabled?: boolean
    placeholder?: string
    value?: string
}

const FloatingLabel: FC<FloatingLabelProps> = ({
    value = '',
    invalid,
    disabled = false,
    placeholder,
}) => {
    return (
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
                disabled && 'split-color-disabled',
            )}
        >
            {placeholder}
        </Label>
    )
}

export default FloatingLabel
