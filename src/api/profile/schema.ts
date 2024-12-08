import { phoneNumberValidator, stringValidator } from '@/utils/regex'
import { z } from 'zod'
import { baseModelSchema } from '../base/schema'

export const profileSchema = z
    .object({
        firstName: stringValidator('First Name', { isRequired: true }),
        lastName: stringValidator('Last Name', { isRequired: true }),
        phoneNumber: phoneNumberValidator,
        profileImage: z.instanceof(File).or(z.string()).nullish(),
        status: z.string(),
        email: z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email address' }),
    })
    .merge(baseModelSchema)

export type ProfileType = z.infer<typeof profileSchema>
