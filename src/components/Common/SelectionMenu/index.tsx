import { AppSelectOption } from '@/types/common'
import { twMerge } from 'tailwind-merge'

interface AppSelectMenuProps {
    name: string
    label?: string
    classname?: string
    options: AppSelectOption[]
    value?: string
    multiple?: boolean
    onChange?: (value: string) => void
    errorMessage?: string
    defaultValue?: string
    disabled?: boolean
}

export const AppSelectMenu = (props: AppSelectMenuProps) => {
    return (
        <div>
            {props.label && (
                <label htmlFor='location' className='block text-sm font-medium text-gray-700'>
                    Location
                </label>
            )}

            <select
                id={props.name}
                name={props.name}
                value={props.value}
                multiple={props.multiple}
                onChange={(e) => props.onChange && props.onChange(e.target.value)}
                className={twMerge(
                    'mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm hover:cursor-pointer',
                    props.errorMessage && 'border-red-500',
                    props.classname,
                )}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
            >
                {props.options?.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
