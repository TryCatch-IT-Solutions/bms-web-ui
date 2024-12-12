import * as React from 'react'

import { FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Input } from '../Input'
import { useTranslation } from 'react-i18next'
import { passwordRegex } from '@/utils/regex'
import { cn } from '@/utils/helper'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    value?: string
    criteria?: boolean
    criteriaClassname?: string
    hasConfirmPassword?: boolean
    isReverse?: boolean
    onChange?: (value: string) => void
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

type PasswordCriteriaProps = React.HTMLAttributes<HTMLDivElement> & {
    values: string
}

// Show criteria if criteria is true. or 2nd password is provided

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, criteria, criteriaClassname, hasConfirmPassword, ...props }, ref) => {
        const [value, setValue] = React.useState(props.value || '')
        const [showPassword, setShowPassword] = React.useState(false)

        const Icon = showPassword ? FaEye : FaEyeSlash

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
            props.onChange && props.onChange(event.target.value)
        }

        React.useEffect(() => {
            setValue(props.value || '')
        }, [props.value])

        const handleTogglePassword = () => {
            setShowPassword(!showPassword)
        }

        return (
            <div className={cn('relative flex', props.isReverse ? 'flex-col-reverse' : 'flex-col')}>
                <div>
                    <div className='relative'>
                        <Input
                            className={className + ' pr-9'}
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleChange}
                            ref={ref}
                            {...props}
                        />
                        <button
                            type='button'
                            onClick={handleTogglePassword}
                            className='absolute top-1/2 -translate-y-1/2 right-3'
                        >
                            <Icon className='w-5' fill='black' />
                        </button>

                        {(criteria || hasConfirmPassword) && value !== '' ? (
                            <PasswordCriteria className={criteriaClassname} values={value} />
                        ) : null}
                    </div>
                </div>
            </div>
        )
    },
)

PasswordInput.displayName = 'InputPassword'

export const PasswordCriteria = (props: PasswordCriteriaProps) => {
    const { className, values = '' } = props
    const { t } = useTranslation('sign-in')
    return (
        <div aria-hidden={true} className={cn('mt-5 text-sm absolute', className)}>
            <ul className='space-y-3 list-none mt-3' aria-live='assertive'>
                {passwordRegex?.map((data, index) => {
                    return (
                        <li key={`_${index}`} className='flex flex-row gap-[12px] items-center'>
                            <div className='w-[15px] h-[15px]'>
                                <FaCheckCircle
                                    className={cn(
                                        'h-full w-full mr-2',
                                        values.match(data.regex)
                                            ? 'text-zentive-green-dark'
                                            : 'text-secondary opacity-40',
                                    )}
                                />
                            </div>
                            <span className='text-zentive-gray-medium text-base' aria-hidden={true}>
                                {t(data.description)}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export { PasswordInput }
