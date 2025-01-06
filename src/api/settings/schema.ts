import { z } from 'zod'

export const APIKeySchema = z.object({
    id: z.number(),
    key: z.string(),
    value: z.string(),
})

export const createAPIKeySchema = APIKeySchema.omit({ id: true })

export type APIKeyType = z.infer<typeof APIKeySchema>
export type CreateAPIKeyType = z.infer<typeof createAPIKeySchema>
