import { zodResolver } from '@hookform/resolvers/zod'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodSchema } from 'zod'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const logZodResolver = (schema: ZodSchema) => {
    return async (data: any, context: any, options: any) => {
        const resolver = zodResolver(schema)
        const result = await resolver(data, context, options)

        if (result.errors) {
            console.error('Zod Validation Errors:', result.errors)
        }

        return result
    }
}
