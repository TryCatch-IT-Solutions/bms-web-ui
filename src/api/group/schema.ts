import { z } from 'zod'
import { baseModelSchema } from '../base/schema'
import { profileSchema } from '../profile/schema'
import { paginationSchema } from '@/components/Pagination/schema'
import { deviceSchema } from '../device/schema'

export const groupSchema = z
    .object({
        id: z.number(),
        name: z.string(),
        employees: z.array(profileSchema),
        group_admin: profileSchema,
        devices_count: z.number(),
    })
    .merge(baseModelSchema)

export const createGroupSchema = groupSchema
    .pick({
        name: true,
    })
    .merge(
        z.object({
            employee_profiles: z.array(profileSchema).nullable(),
            admin_profile: profileSchema.optional(),
            employees: z.array(z.number()),
            group_admin: z.number(),
        }),
    )

export const groupListRecordSchema = groupSchema
    .omit({
        group_admin: true,
    })
    .merge(
        z.object({
            group_admin: profileSchema,
        }),
    )

export const gorupListSchema = z.object({
    content: z.array(groupListRecordSchema),
    meta: paginationSchema,
})

export const viewGroupSchema = groupSchema
    .pick({
        name: true,
        id: true,
    })
    .merge(
        z.object({
            devices: z.array(deviceSchema),
            group_admin: z.object({
                id: z.number(),
                group_id: z.number(),
                first_name: z.string(),
                last_name: z.string(),
            }),
            employees: z.array(profileSchema),
        }),
    )

export const editGroupSchema = groupSchema.pick({ name: true, id: true }).merge(
    z.object({
        admin_profile: z.object({
            id: z.number(),
            first_name: z.string(),
            last_name: z.string(),
        }),
        group_admin: z.number(),
    }),
)

export const addEmployeeToGroupSchema = createGroupSchema.pick({ employees: true }).merge(
    z.object({
        selectall: z.boolean().optional(),
    }),
)

export const groupsToDeleteSchema = z.object({
    groups: z.array(z.number()),
})

export const mergeConflictingAccountSchema = z.object({
    id: z.number(),
    merge_to: z.number(),
})

export type GroupType = z.infer<typeof groupSchema>
export type CreateGroupType = z.infer<typeof createGroupSchema>
export type GroupListType = z.infer<typeof gorupListSchema>
export type GroupListRecordType = z.infer<typeof groupListRecordSchema>
export type ViewGroupType = z.infer<typeof viewGroupSchema>
export type EditGroupType = z.infer<typeof editGroupSchema>
export type AddEmpToGroupType = z.infer<typeof addEmployeeToGroupSchema>
export type DeleteGroupType = z.infer<typeof groupsToDeleteSchema>
export type MergeConflictingAccountType = z.infer<typeof mergeConflictingAccountSchema>
