import { PaginationType } from '@/components/Pagination/schema'
import { axiosInstance } from '../axiosInstance'
import {
    CreateGroupType,
    ViewGroupType,
    GroupListType,
    EditGroupType,
    AddEmpToGroupType,
    DeleteGroupType,
} from './schema'

export const createGroup = async (data: CreateGroupType) => {
    const response = await axiosInstance.post('/api/groups/create', data)

    return response.data
}

export const getGroups = async (p: PaginationType): Promise<GroupListType> => {
    const response = await axiosInstance.get('/api/groups', {
        params: {
            page: p.current_page,
            limit: p.itemsPerPage,
        },
    })

    return response.data
}

export const getGroupByid = async (id: number): Promise<ViewGroupType> => {
    const response = await axiosInstance.get(`/api/group/${id}`)

    return response.data
}

export const updateGroupName = async (data: EditGroupType) => {
    const response = await axiosInstance.post(`/api/group/${data?.id}`, data)

    return response.data
}

export const addGroupEmployee = async (data: AddEmpToGroupType, groupId: number) => {
    const response = await axiosInstance.post(`/api/group/${groupId}/employees/add`, data)

    return response.data
}

export const removeGroupEmployee = async (data: AddEmpToGroupType, groupId: number) => {
    const response = await axiosInstance.post(`/api/group/${groupId}/employees/remove`, data)

    return response.data
}

export const removeGroup = async (data: DeleteGroupType) => {
    const response = await axiosInstance.post(`/api/groups/delete`, data)

    return response.data
}
