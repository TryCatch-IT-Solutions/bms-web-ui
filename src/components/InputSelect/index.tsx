import { FormControl, useFormField } from '../Forms'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select'
import { Label } from '../Label'
import { cn } from '@/utils/helper'

type InputSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    onChange: (value: string) => void
    options: { value: string; label: string }[]
    placeholder: string
    value: string
}

const InputSelect = ({
    className,
    disabled = false,
    onChange,
    options,
    placeholder,
    value = '',
}: InputSelectProps) => {
    const { invalid } = useFormField()

    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <FormControl>
                <div className='relative'>
                    <SelectTrigger
                        className={cn(
                            'peer flex h-[45px] w-full rounded-sm border border-zentive-gray-medium placeholder:text-transparent bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-zentive-gray-medium focus:ring-0',
                            invalid
                                ? 'border-zentive-red-dark'
                                : 'focus:border focus:border-zentive-green-dark',
                            className,
                        )}
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <Label
                        className={cn(
                            'floating-label absolute left-3 top-1/2 -translate-y-1/2 text-base text-zentive-gray-medium duration-100 ease-linear peer-focus:-translate-y-[2.15rem] peer-focus:text-sm peer-focus:px-1 pointer-events-none',
                            // with value
                            value && 'split-color text-sm -translate-y-[2.15rem] px-1',
                            !value && 'peer-focus:split-color bg-white',
                            //
                            invalid
                                ? 'text-zentive-red-dark split-color bg-red-200'
                                : 'peer-focus:text-zentive-green-dark',
                            disabled && 'split-color-disabled',
                        )}
                    >
                        {placeholder}
                    </Label>
                </div>
            </FormControl>
            <SelectContent className='z-[70]'>
                {options.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default InputSelect
