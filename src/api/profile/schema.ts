import { phoneNumberValidator, stringValidator } from '@/utils/regex'
import { z } from 'zod'
import { baseModelSchema } from '../base/schema'

export const profileSchema = z
    .object({
        firstName: stringValidator('First Name', { isRequired: true }),
        lastName: stringValidator('Last Name', { isRequired: true }),
        middleName: stringValidator('Middle Name', { isRequired: true }),
        role: stringValidator('Role', { isRequired: true }),
        groupId: z.number().min(1, 'Group is Required'),
        address1: stringValidator('Address ', { isRequired: true }),
        address2: z.string().optional(),
        barangay: stringValidator('Barangay', { isRequired: true }),
        municipality: stringValidator('Municipality', { isRequired: true }),
        province: stringValidator('Province', { isRequired: true }),
        zipCode: stringValidator('Zip Code', { isRequired: true }),
        birthDate: stringValidator('Birth Date', { isRequired: true }),
        isSynced: z.boolean().optional(),
        gender: stringValidator('Gender', { isRequired: true }),
        phoneNumber: phoneNumberValidator,
        profileImage: z
            .instanceof(File)
            .or(stringValidator('', { isRequired: true }))
            .nullish(),
        status: z.string(),
        email: z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email address' }),
    })
    .merge(baseModelSchema)

export type ProfileType = z.infer<typeof profileSchema>
