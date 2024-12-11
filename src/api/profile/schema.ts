import {
    lowercaseRegex,
    numericRegex,
    phoneNumberValidator,
    specialRegex,
    stringValidator,
    uppercaseRegex,
} from '@/utils/regex'
import { z } from 'zod'
import { baseModelSchema } from '../base/schema'

export const profileSchema = z
    .object({
        id: z.number(),
        first_name: stringValidator('First Name', { isRequired: true }),
        last_name: stringValidator('Last Name', { isRequired: true }),
        middle_name: stringValidator('Middle Name', { isRequired: true }),
        role: stringValidator('Role', { isRequired: true }),
        group_id: z.number().min(1, 'Group is Required').optional(),
        address1: stringValidator('Address ', { isRequired: true }),
        address2: z.string().optional(),
        barangay: stringValidator('Barangay', { isRequired: true }),
        municipality: stringValidator('Municipality', { isRequired: true }),
        province: stringValidator('Province', { isRequired: true }),
        zip_code: stringValidator('Zip Code', { isRequired: true }),
        birth_date: stringValidator('Birth Date', { isRequired: true }),
        is_synced: z.boolean().optional(),
        gender: stringValidator('Gender', { isRequired: true }),
        phone_number: phoneNumberValidator,
        status: z.string(),
        emergency_contact_name: z.string(),
        emergency_contact_no: z.string(),
        email: z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email address' }),
    })
    .merge(baseModelSchema)

export const createUserSchema = profileSchema
    .omit({ id: true, group_id: true })
    .merge(
        z.object({
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
        }),
    )
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'], // Error shown on `confirmPassword`
    })

export type ProfileType = z.infer<typeof profileSchema>
export type CreateUserType = z.infer<typeof createUserSchema>
