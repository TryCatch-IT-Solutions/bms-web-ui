import { paginationSchema } from '@/components/Pagination/schema'
import { z } from 'zod'

export const deviceSchema = z.object({
    id: z.number(),
    group_id: z.number(),
    model: z.string(),
    serial_no: z.string(),
    lat: z.number(),
    lon: z.number(),
})

export const deviceListSchema = z.object({
    data: z.array(deviceSchema),
    meta: paginationSchema,
})

export const createDeviceSchema = deviceSchema.omit({ id: true })

export type DeviceType = z.infer<typeof deviceSchema>
export type CreateDeviceType = z.infer<typeof createDeviceSchema>
export type DeviceListType = z.infer<typeof deviceListSchema>
