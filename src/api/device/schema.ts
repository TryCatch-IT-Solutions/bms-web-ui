import { paginationSchema } from '@/components/Pagination/schema'
import { z } from 'zod'

export const deviceSchema = z.object({
    id: z.number(),
    nickname: z.string().optional(),
    group_id: z.number(),
    group: z
        .object({
            id: z.number(),
            name: z.string(),
        })
        .optional()
        .nullish(),
    model: z.string(),
    serial_no: z.string(),
    manual_time_entry: z.boolean().optional(),
    check_in: z.boolean().optional(),
    check_out: z.boolean().optional(),
    break_in: z.boolean().optional(),
    break_out: z.boolean().optional(),
    overtime_in: z.boolean().optional(),
    overtime_out: z.boolean().optional(),
    lat: z.number(),
    lon: z.number(),
    is_online: z.union([z.number(), z.boolean()]).optional(),
    last_sync: z.string().optional(),
    last_activity: z.string().optional(),
})

export const bulkSettingsUpdateSchema = deviceSchema
    .pick({
        manual_time_entry: true,
        check_in: true,
        check_out: true,
        break_in: true,
        break_out: true,
        overtime_in: true,
        overtime_out: true,
    })
    .merge(
        z.object({
            ids: z.array(z.number()),
        }),
    )

export const deviceListSchema = z.object({
    content: z.array(deviceSchema),
    meta: paginationSchema,
})

export const deleteDeviceSchema = z.object({
    devices: z.array(z.number()),
})

export const createDeviceSchema = deviceSchema.omit({ id: true })

export const pushPullRecordSchema = z.object({
    id: z.number(),
    action: z.string(),
})

export type DeviceType = z.infer<typeof deviceSchema>
export type CreateDeviceType = z.infer<typeof createDeviceSchema>
export type DeviceListType = z.infer<typeof deviceListSchema>
export type DeleteDeviceType = z.infer<typeof deleteDeviceSchema>
export type BulkSettingsUpdateType = z.infer<typeof bulkSettingsUpdateSchema>
export type PushPullRecordType = z.infer<typeof pushPullRecordSchema>
