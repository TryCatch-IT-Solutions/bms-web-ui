import { z } from 'zod'
import { userProfileSchema } from '../profile/schema'

export const signInSchema = userProfileSchema.pick({
    email: true
}).merge(z.object({
    password: z
        .string({ required_error: 'Password is required' })
        .min(1, { message: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters long' }),
}))

export type SignInType = z.infer<typeof signInSchema>