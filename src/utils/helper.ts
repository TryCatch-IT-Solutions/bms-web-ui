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

export const convertImageToBase64 = (imagePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = imagePath
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(img, 0, 0, img.width, img.height)
            const base64String = canvas.toDataURL('image/png') // Change format if needed
            resolve(base64String)
        }
        img.onerror = (error) => {
            reject(error)
        }
    })
}
