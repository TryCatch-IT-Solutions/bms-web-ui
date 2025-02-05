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
import { paginationSchema } from '@/components/Pagination/schema'

export const profileSchema = z
    .object({
        id: z.number(),
        first_name: stringValidator('First Name', { isRequired: true }),
        last_name: stringValidator('Last Name', { isRequired: true }),
        middle_name: z.string().optional().nullable(),
        role: z.string(),
        group_id: z.number().nullish().optional(),
        address1: stringValidator('Address ', { isRequired: true }),
        address2: z.string().optional().nullable(),
        barangay: stringValidator('Barangay', { isRequired: true }),
        municipality: stringValidator('Municipality', { isRequired: true }),
        province: stringValidator('Province', { isRequired: true }),
        zip_code: stringValidator('Zip Code', { isRequired: true }),
        birth_date: stringValidator('Birth Date', { isRequired: true }),
        is_synced: z.number().optional(),
        gender: stringValidator('Gender', { isRequired: true }),
        phone_number: phoneNumberValidator,
        status: z.string(),
        emergency_contact_name: stringValidator('Emergency Contact Name', { isRequired: true }),
        emergency_contact_no: phoneNumberValidator,
        email: z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email address' }),
    })
    .merge(baseModelSchema)

export const editUserSchema = profileSchema.omit({ group_id: true, status: true })

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
    .superRefine((data, ctx) => {
        if (
            data.password &&
            data.confirmPassword &&
            data.password.trim() !== data.confirmPassword.trim()
        ) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Passwords do not match',
            })
        }
    })

export const userListSchema = z.object({
    content: z.array(profileSchema),
    meta: paginationSchema,
})

export const bulkUserUpdateStatusSchema = z.object({
    users: z.array(z.number()),
})

export const userStatusCountSchema = z.object({
    active: z.number(),
    inactive: z.number(),
})

export const importUsersSchema = z.object({
    file: z.instanceof(File),
})

export const employeeTimeEntriesSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    type: z.enum(['time_in', 'time_out', 'other_type']),
    datetime: z.string(),
    metadata: z.array(z.unknown()),
    is_synced: z.number().int().min(0).max(1),
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.nullable(z.string()),
    lat: z.number(),
    lon: z.number(),
    employee: profileSchema.pick({
        id: true,
        group_id: true,
        first_name: true,
        last_name: true,
        middle_name: true,
    }),
})

export const timeEntriesSchema = z.object({
    content: z.array(employeeTimeEntriesSchema),
    meta: paginationSchema,
})

export type ProfileType = z.infer<typeof profileSchema>
export type UserListType = z.infer<typeof userListSchema>
export type CreateUserType = z.infer<typeof createUserSchema>
export type EditUserType = z.infer<typeof editUserSchema>
export type BulkUserUpdateStatusType = z.infer<typeof bulkUserUpdateStatusSchema>
export type UserStatusCountType = z.infer<typeof userStatusCountSchema>
export type ImportUserType = z.infer<typeof importUsersSchema>
export type TimeEntriesListType = z.infer<typeof timeEntriesSchema>
export type TimeEntryType = z.infer<typeof employeeTimeEntriesSchema>
