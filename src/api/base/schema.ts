import { z } from 'zod'
export const baseModelSchema = z.object({
    createdAt: z.string(),
    createdBy: z.string(),
    updatedAt: z.string(),
    updatedBy: z.string(),
})
