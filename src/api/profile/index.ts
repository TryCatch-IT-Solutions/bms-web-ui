import { PaginationType } from '@/components/Pagination/schema'
import { axiosInstance } from '../axiosInstance'
import { CreateUserType, EditUserType, ProfileType, UserListType } from './schema'

export const getUsers = async (p: PaginationType): Promise<UserListType> => {
    const response = await axiosInstance.get(`/api/users?current_page=${p.current_page}`)

    return response.data
}

export const createUser = async (data: CreateUserType) => {
    const response = await axiosInstance.post('/api/register', data)

    return response.data
}

export const getUserById = async (id: number): Promise<ProfileType> => {
    const response = await axiosInstance.get(`/api/user/${id}`)

    return response.data
}

export const editUser = async (data: EditUserType) => {
    const response = await axiosInstance.post(`/api/user/${data.id}`, data)

    return response.data
}
