import axios from 'axios'
import { z } from 'zod'

export const API_URL = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL

export const WEBSITE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_WEBSITE_URL
    : import.meta.env.VITE_DEV_WEBSITE_URL

export const ENCRYPT_KEY = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_ENCRYPT_KEY
    : import.meta.env.VITE_DEV_ENCRYPT_KEY

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('tokenAtom')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken.replace(/"/g, '')}`
    }
    return config
})

export const apiResponseSchema = z.object({
    data: z.any(),
    message: z.string().optional(),
    errors: z.record(z.array(z.string())).optional(),
})

export const LOGO_URL = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_LOGO_PREFIX_URL
    : import.meta.env.VITE_DEV_LOGO_PREFIX_URL

export type APIResponseType = z.infer<typeof apiResponseSchema>
