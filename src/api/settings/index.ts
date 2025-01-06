import { axiosInstance } from '../axiosInstance'
import { CreateAPIKeyType } from './schema'

export const createAPIkey = async (data: CreateAPIKeyType) => {
    const response = await axiosInstance.post('/api/settings', data)

    return response.data
}

export const getAPIKey = async (key: string) => {
    const response = await axiosInstance.get('/api/settings', {
        params: {
            key: key,
        },
    })

    return response.data
}
