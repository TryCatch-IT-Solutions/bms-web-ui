import { paginationSchema } from '@/components/Pagination/schema'
import { z } from 'zod'

export const deviceSchema = z.object({
    id: z.number(),
    group_id: z.number(),
    group: z.object({
        id: z.number(),
        name: z.string(),
    }),
    model: z.string(),
    serial_no: z.string(),
    lat: z.number(),
    lon: z.number(),
})

export const deviceListSchema = z.object({
    content: z.array(deviceSchema),
    meta: paginationSchema,
})

export const deleteDeviceSchema = z.object({
    devices: z.array(z.number()),
})

export const createDeviceSchema = deviceSchema.omit({ id: true })

export type DeviceType = z.infer<typeof deviceSchema>
export type CreateDeviceType = z.infer<typeof createDeviceSchema>
export type DeviceListType = z.infer<typeof deviceListSchema>
export type DeleteDeviceType = z.infer<typeof deleteDeviceSchema>
