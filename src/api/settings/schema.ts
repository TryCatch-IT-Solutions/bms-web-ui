import { z } from 'zod'

export const APIKeySchema = z.object({
    id: z.number(),
    key: z.string(),
    value: z.string(),
    fields: z
        .object({
            EMAIL: z.string().email(),
            PASSWORD: z.string(),
        })
        .optional(),
})

export const createAPIKeySchema = APIKeySchema.omit({ id: true })
export const uploadLogoSchema = APIKeySchema.omit({ id: true, value: true }).merge(
    z.object({
        value: z.instanceof(File),
    }),
)

export type APIKeyType = z.infer<typeof APIKeySchema>
export type CreateAPIKeyType = z.infer<typeof createAPIKeySchema>
export type UploadLogoType = z.infer<typeof uploadLogoSchema>
