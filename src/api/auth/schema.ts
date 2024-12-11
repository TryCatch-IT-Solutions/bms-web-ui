import { lowercaseRegex, numericRegex, specialRegex, uppercaseRegex } from '@/utils/regex'
import { z } from 'zod'
import { profileSchema } from '../profile/schema'

export const authSchema = z.object({
    password: z
        .string({ required_error: 'Password is required' })
        .min(1, { message: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters long' }),
    newPassword: z
        .string()
        .min(8, { message: 'New password is required' })
        .trim()
        .regex(uppercaseRegex, {
            message: 'Must Include at least one uppercase letter',
        })
        .regex(specialRegex, {
            message: 'Must include at least one special character',
        })
        .regex(numericRegex, { message: 'Must include at least one number' })
        .regex(lowercaseRegex, {
            message: 'Must include at least one lowercase letter',
        }),
    confirmPassword: z.string().min(8, { message: 'Confirm password is required' }).trim(),
})

export const createPasswordSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'New password is required' })
        .trim()
        .regex(uppercaseRegex, {
            message: 'Must Include at least one uppercase letter',
        })
        .regex(specialRegex, {
            message: 'Must include at least one special character',
        })
        .regex(numericRegex, { message: 'Must include at least one number' })
        .regex(lowercaseRegex, {
            message: 'Must include at least one lowercase letter',
        }),
    confirmPassword: z.string().min(8, { message: 'Confirm password is required' }).trim(),
})

export const signInSchema = authSchema
    .pick({
        password: true,
    })
    .merge(profileSchema.pick({ email: true }))

export const forgotPasswordSchema = profileSchema.pick({
    email: true,
})

export const signInResponseSchema = z.object({
    user: profileSchema,
    token: z.string(),
})

export type SignInType = z.infer<typeof signInSchema>
export type SignInResponseType = z.infer<typeof signInResponseSchema>
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>
