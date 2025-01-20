import { paginationSchema } from '@/components/Pagination/schema'
import { z } from 'zod'

export const announcementSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    title: z.string(),
    message: z.string(),
})

export const announcementList = z.object({
    content: z.array(announcementSchema),
    meta: paginationSchema,
})

export type AnnountmentType = z.infer<typeof announcementSchema>
export type AnnouncementListType = z.infer<typeof announcementList>
