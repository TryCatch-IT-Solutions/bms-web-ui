import axios from 'axios'
import { z } from 'zod'

export const API_URL = import.meta.env.PROD
    ? import.meta.env.VITE_API_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL

export const WEBSITE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_WEBSITE_URL
    : import.meta.env.VITE_DEV_WEBSITE_URL

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('tokenAtom')
    if (accessToken) {
        // Remove quotes, if any, from the token
        config.headers.Authorization = `Bearer ${accessToken.replace(/"/g, '')}`
    }
    return config
})

export const apiResponseSchema = z.object({
    data: z.any(),
    message: z.string().optional(),
    errors: z.record(z.array(z.string())).optional(),
})

export type APIResponseType = z.infer<typeof apiResponseSchema>