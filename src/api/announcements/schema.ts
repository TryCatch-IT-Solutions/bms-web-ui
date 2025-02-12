import { paginationSchema } from '@/components/Pagination/schema'
import { z } from 'zod'

export const announcementSchema = z.object({
    id: z.number(),
    user_id: z.array(z.number()).optional(),
    title: z.string(),
    message: z.string(),
    expiration: z.string(),
})

export const createAnnouncementSchema = announcementSchema.omit({ id: true })

export const announcementList = z.object({
    content: z.array(announcementSchema),
    meta: paginationSchema,
})

export type AnnountmentType = z.infer<typeof announcementSchema>
export type AnnouncementListType = z.infer<typeof announcementList>
export type CreateAnnouncementType = z.infer<typeof createAnnouncementSchema>
