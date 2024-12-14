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
): Promise<UserListType> => {
    const response = await axiosInstance.get(`/api/users`, {
        params: {
            page: p.current_page,
            limit: p.itemsPerPage,
            roles: role,
            status: status,
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

export const bulkUserUpdateStatus = async (data: BulkUserUpdateStatusType) => {
    const response = await axiosInstance.post('/api/users/delete', data)

    return response.data
}

export const getUserStatusCount = async (): Promise<UserStatusCountType> => {
    const response = await axiosInstance.get('/api/users/count')

    return response.data
}
