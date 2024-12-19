import { axiosInstance } from '../axiosInstance'
import { CreateGroupType, GroupListType } from './schema'

export const createGroup = async (data: CreateGroupType) => {
    const response = await axiosInstance.post('/api/groups/create', data)

    return response.data
}

export const getGroups = async (): Promise<GroupListType> => {
    const response = await axiosInstance.get('/api/groups')

    return response.data
}
