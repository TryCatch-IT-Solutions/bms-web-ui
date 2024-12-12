import { lowercaseRegex, numericRegex, specialRegex, uppercaseRegex } from '@/utils/regex'
import { z } from 'zod'
import { profileSchema } from '../profile/schema'

export const authSchema = z.object({
    password: z.string({ required_error: 'Password is required' }),
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

export const updatePasswordSchema = z
    .object({
        email: z.string(),
        password: z
            .string()
            .min(8, { message: 'New password is required' })
            .trim()
            .regex(uppercaseRegex, {
                message: 'Must include at least one uppercase letter',
            })
            .regex(specialRegex, {
                message: 'Must include at least one special character',
            })
            .regex(numericRegex, { message: 'Must include at least one number' })
            .regex(lowercaseRegex, {
                message: 'Must include at least one lowercase letter',
            }),
        confirmPassword: z.string().min(8, { message: 'Confirm password is required' }).trim(),
        token: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.password && data.password.trim() !== data.confirmPassword.trim()) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Passwords do not match',
            })
        }
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

export const createNewPasswordSchema = z.object({
    password: z.string(),
    token: z.string(),
})

export type SignInType = z.infer<typeof signInSchema>
export type SignInResponseType = z.infer<typeof signInResponseSchema>
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>
export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>
