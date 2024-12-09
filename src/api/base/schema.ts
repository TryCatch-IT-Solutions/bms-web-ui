import { z } from 'zod'
export const baseModelSchema = z.object({
    createdAt: z.string().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.string().optional(),
    updatedBy: z.string().optional(),
})
