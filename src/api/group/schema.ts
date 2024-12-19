import { z } from 'zod'
import { baseModelSchema } from '../base/schema'
import { profileSchema } from '../profile/schema'
import { paginationSchema } from '@/components/Pagination/schema'

export const groupSchema = z
    .object({
        id: z.number(),
        name: z.string(),
        employees: z.array(z.number()),
        group_admin: z.number(),
    })
    .merge(baseModelSchema)

export const createGroupSchema = groupSchema
    .omit({
        id: true,
    })
    .merge(
        z.object({
            employee_profiles: z.array(profileSchema).optional(),
            admin_profile: profileSchema.optional(),
        }),
    )

export const gorupListSchema = z.object({
    content: z.array(groupSchema),
    meta: paginationSchema,
})

export type GroupType = z.infer<typeof groupSchema>
export type CreateGroupType = z.infer<typeof createGroupSchema>
export type GroupListType = z.infer<typeof gorupListSchema>
