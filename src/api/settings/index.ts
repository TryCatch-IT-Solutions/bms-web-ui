import { axiosInstance } from '../axiosInstance'
import { APIKeyType, CreateAPIKeyType, UploadLogoType } from './schema'

export const createAPIkey = async (data: CreateAPIKeyType) => {
    const response = await axiosInstance.post('/api/settings', data)

    return response.data
}

export const uploadLogo = async (data: UploadLogoType) => {
    const formData = new FormData()

    if (data.value) {
        formData.append('value', data.value)
    }
    const response = await axiosInstance.post('/api/settings', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data
}

export const getAPIKey = async (key: string, fields: number): Promise<APIKeyType> => {
    const response = await axiosInstance.get('/api/settings', {
        params: {
            key: key,
            fields,
        },
    })

    return response.data
}
