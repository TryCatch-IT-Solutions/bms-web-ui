import { z } from 'zod'

export const deviceSchema = z.object({
    id: z.number(),
    groupId: z.number(),
    model: z.string(),
    serialNo: z.string(),
    lat: z.number(),
    lon: z.number(),
    registeredAt: z.string(),
})
