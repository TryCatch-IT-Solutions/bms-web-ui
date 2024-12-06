import { cn } from '@/utils/helper'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const errorMessages = [
    { label: '8 Characters Long', value: 'CHARACTER_LENGTH' },
    { label: '1 Number', value: 'CHARACTER_NUMBER' },
    { label: '1 Lowercase Letter', value: 'CHARACTER_LOWERCASE' },
    { label: '1 Special Character (examples: !@#$&%)', value: 'SPECIAL_CHARACTER' },
    { label: '1 Uppercase Letter', value: 'CHARACTER_UPPERCASE' },
]

const PasswordValidator = ({ errors }: { errors: string }) => {
    return (
        <div className='space-y-2'>
            {errorMessages?.map((errorMessage, index) => (
                <div key={errorMessage.value + index.toString} className='flex space-x-1 '>
                    <span className={cn(errors ? 'visible' : 'hidden')}>
                        <span
                            className={cn(
                                errors === errorMessage.value
                                    ? 'text-zentive-red-dark'
                                    : 'text-zentive-green-dark',
                                'mt-1 inline-block',
                            )}
                        >
                            {errors === errorMessage.value ? <FaTimesCircle /> : <FaCheckCircle />}
                        </span>
                    </span>
                    <p>{errorMessage.label}</p>
                </div>
            ))}
        </div>
    )
}
export default PasswordValidator
