import { z } from 'zod'
import { deviceSchema } from '../device/schema'
import { profileSchema } from '../profile/schema'
import { paginationSchema } from '@/components/Pagination/schema'

export const logSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    related_it: z.number(),
    action: z.string(),
    description: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    user: profileSchema.partial(),
    meta_data: deviceSchema.partial().nullish(),
})

export const logResponseSchema = z.object({
    content: z.array(logSchema),
    meta: paginationSchema,
})

export type LogsType = z.infer<typeof logResponseSchema>
export type LogRecordType = z.infer<typeof logSchema>
