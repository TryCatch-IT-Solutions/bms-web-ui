import { PaginationType } from '@/components/Pagination/schema'
import { axiosInstance } from '../axiosInstance'
import {
    BulkUserUpdateStatusType,
    CreateUserType,
    EditUserType,
    ImportUserType,
    ProfileType,
    TimeEntriesListType,
    UserListType,
    UserStatusCountType,
} from './schema'

export const getUsers = async (
    p: PaginationType,
    status: string[],
    role: string[],
    available: boolean | null,
    search: string | null,
): Promise<UserListType> => {
    const params = {
        page: search === null || search === '' ? p.current_page : 1,
        limit: p.itemsPerPage,
        roles: role,
        status: status,
        search: search ?? null,
        ...(available !== null && { available: available ? 1 : 0 }),
    }

    const response = await axiosInstance.get(`/api/users`, { params })

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

export const importUsers = async (data: ImportUserType) => {
    const formData = new FormData()

    if (data.file && data.file instanceof File) {
        formData.append('file', data.file)
    } else {
        console.error('Invalid file object:', data.file)
        return
    }

    try {
        const response = await axiosInstance.post('/api/users/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return response.data.content
    } catch (err) {
        console.error('Failed to export employees via csv:', err)
        throw err
    }
}

export const getEmployeeTimeEntries = async (
    p: PaginationType,
    search: string | null,
): Promise<TimeEntriesListType> => {
    const response = await axiosInstance.get('/api/time-entries', {
        params: {
            page: search === null || search === '' ? p.current_page : 1,
            limit: p.itemsPerPage,
            date_start: '',
            date_end: '',
            search: search,
        },
    })

    return response.data
}
