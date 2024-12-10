import { z } from 'zod'
import { baseModelSchema } from '../base/schema'
import { profileSchema } from '../profile/schema'
import { deviceSchema } from '../device/schema'

export const groupSchema = z
    .object({
        groupId: z.number(),
        name: z.string(),
        members: z.array(profileSchema),
        device: deviceSchema.optional(),
    })
    .merge(baseModelSchema)

export const createGroupSchema = groupSchema
    .omit({
        device: true,
        members: true,
    })
    .merge(
        z.object({
            ids: z.array(z.number()),
            deviceId: deviceSchema.pick({ id: true }),
            groupAdminId: z.number(),
        }),
    )

export type GroupType = z.infer<typeof groupSchema>
export type CreateGroupType = z.infer<typeof createGroupSchema>
