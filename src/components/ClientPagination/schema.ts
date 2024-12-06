import { z } from 'zod'

export const PaginationSchema = z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
    totalRecords: z.number().optional(),
    itemsPerPage: z.number().optional(),
})

export type PaginationType = z.infer<typeof PaginationSchema>
