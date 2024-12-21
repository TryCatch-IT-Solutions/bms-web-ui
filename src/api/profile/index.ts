import { PaginationType } from '@/components/Pagination/schema'
import { axiosInstance } from '../axiosInstance'
import {
    BulkUserUpdateStatusType,
    CreateUserType,
    EditUserType,
    ProfileType,
    UserListType,
    UserStatusCountType,
} from './schema'

export const getUsers = async (
    p: PaginationType,
    status: string[],
    role: string[],
    available: boolean,
): Promise<UserListType> => {
    const response = await axiosInstance.get(`/api/users`, {
        params: {
            page: p.current_page,
            limit: p.itemsPerPage,
            roles: role,
            status: status,
            available: available,
        },
    })

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

export const bulkDeleteUserStatus = async (data: BulkUserUpdateStatusType) => {
    const response = await axiosInstance.post('/api/users/delete', data)

    return response.data
}

export const bulkRestoreUserStatus = async (data: BulkUserUpdateStatusType) => {
    const response = await axiosInstance.post('/api/users/restore', data)

    return response.data
}

export const getUserStatusCount = async (page?: string): Promise<UserStatusCountType> => {
    const response = await axiosInstance.get(`/api/users/count?page=${page}`)

    return response.data
}
