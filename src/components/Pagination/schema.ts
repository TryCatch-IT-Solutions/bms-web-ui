import { z } from 'zod'

export const paginationSchema = z.object({
    current_page: z.number().optional(),
    per_page: z.number().optional(),
    total: z.number().optional(),
    itemsPerPage: z.number().optional(),
})

export type PaginationType = z.infer<typeof paginationSchema>
