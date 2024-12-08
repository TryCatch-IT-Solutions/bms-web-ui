export const locationRegex = /^[a-zA-Z0-9\s,.'#-]*$/
export const lowercaseRegex = /(?=.*[a-z])/ // At least one lowercase character
export const uppercaseRegex = /(?=.*[A-Z])/ // At least one uppercase character
export const numericRegex = /(?=.*\d)/ // At least one digit
export const specialRegex = /(?=.*[@$!%*#?&])/ // At least one special character from the set
export const lengthRegex = /.{8,}/
export const startsWithSpaceRegex = /^(?!\s).*$/
export const endWithSpaceRegex = /^(.*?[^ ]|^)$/
export const validCharactersRegex = /^[a-zA-ZÀ-ÿ '-]*[a-zA-ZÀ-ÿ'][a-zA-ZÀ-ÿ '-]*$/
export const websiteRegex = /^(?:([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,})?$/
export const zipRegex = /^(?:\d{4,5})?$/
export const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/\d{4}$/
export const notificationaDateRegex = /\b\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \+?\d{4} UTC\b/
import {
    INVALID,
    INVALID_WEBSITE,
    NO_INVALID_CHARACTERS,
    PHONE_NUMBER,
    REQUIRED,
} from '@/constants'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'

type StringValidatorOptions = {
    fieldType?: 'email' | 'location' | 'numeric' | 'website' | 'zip' | 'date' | 'textarea'
    isRequired?: boolean
    requiredMessage?: string
}

export const stringValidator = (fieldName: string, options?: StringValidatorOptions) => {
    const {
        fieldType = 'name',
        isRequired = false,
        requiredMessage = `${fieldName} ${REQUIRED}`,
    } = options || {}

    let validator = z.string({ required_error: requiredMessage }).trim()

    switch (fieldType) {
        case 'email':
            validator = validator.email()
            break
        case 'location':
            validator = validator.regex(locationRegex, {
                message: `${fieldName} ${NO_INVALID_CHARACTERS}`,
            })
            break
        case 'numeric':
            validator = validator.regex(numericRegex, {
                message: `${fieldName} ${NO_INVALID_CHARACTERS}`,
            })
            break
        case 'website':
            validator = validator.regex(websiteRegex, { message: INVALID_WEBSITE })
            break
        case 'zip':
            validator = validator.regex(zipRegex, `${fieldName} ${INVALID}`)
            break
        case 'date':
            validator = validator.regex(dateRegex, {
                message: `${fieldName} must be in the format MM/DD/YYYY`,
            })
            break
        default:
            validator = validator
            break
    }

    return isRequired ? validator.min(1, { message: requiredMessage }) : validator.optional()
}

export const phoneNumberValidator = z
    .string()
    .min(1, { message: `${PHONE_NUMBER} ${REQUIRED}` })
    .refine((value) => isValidPhoneNumber(value), {
        message: `${PHONE_NUMBER} ${INVALID}`,
    })

export const allowedImageTypes = ['bmp', 'gif', 'jpeg', 'png', 'webp']?.map(
    (type) => 'image/' + type,
)

export const passwordRegex = [
    {
        regex: lengthRegex,
        description: '8 Characters Long',
        accessibility: 'Your password must be at least 8 characters long.',
    },
    {
        regex: numericRegex,
        description: '1 Number',
        accessibility: 'Your password must contain at least 1 number.',
    },
    {
        regex: lowercaseRegex,
        description: '1 Lowercase Letter',
        accessibility: 'Your password must include at least 1 lowercase letter.',
    },
    {
        regex: specialRegex,
        description: '1 Special Character (examples: !@#$&%)',
        accessibility: 'Your password must contain at least 1 special character like !@#$&%.',
    },
    {
        regex: uppercaseRegex,
        description: '1 Uppercase Letter',
        accessibility: 'Your password must include at least 1 uppercase letter.',
    },
]
