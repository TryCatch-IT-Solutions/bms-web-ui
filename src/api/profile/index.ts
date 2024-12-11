import { axiosInstance } from '../axiosInstance'
import { CreateUserType, ProfileType } from './schema'

export const getUsers = async (): Promise<ProfileType[]> => {
    const response = await axiosInstance.get('/api/users')

    return response.data
}

export const createUser = async (data: CreateUserType) => {
    const response = await axiosInstance.post('/api/register', data)

    return response.data
}
