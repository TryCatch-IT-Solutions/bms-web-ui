import { axiosInstance } from '@/api/axiosInstance'
import {
    BulkSettingsUpdateType,
    CreateDeviceType,
    DeleteDeviceType,
    DeviceListType,
    DeviceType,
    PushPullRecordType,
} from '@/api/device/schema'
import { PaginationType } from '@/components/Pagination/schema'

export const createDevice = async (data: CreateDeviceType) => {
    const response = await axiosInstance.post('/api/devices/create', data)

    return response.data
}

export const getDeviceList = async (
    p: PaginationType,
    search: string,
    groupFilter?: number,
): Promise<DeviceListType> => {
    const params: Record<string, any> = {
        page: search === null || search === '' || groupFilter ? p.current_page : 1,
        limit: p.per_page,
        status: ['active'],
        search: search,
    }

    if (groupFilter && groupFilter > 0) {
        params.groupId = groupFilter
    }

    const response = await axiosInstance.get(`/api/devices`, { params })

    return response.data
}

export const getDeviceMapView = async (): Promise<DeviceType[]> => {
    const response = await axiosInstance.get(`/api/devices`, {
        params: {
            status: ['active'],
        },
    })

    return response.data.content
}

export const getDeviceById = async (id: number): Promise<DeviceType> => {
    const response = await axiosInstance.get(`/api/device/${id}`)

    return response.data
}

export const updateDevice = async (data: DeviceType): Promise<DeviceType> => {
    const response = await axiosInstance.post(`/api/device/${data?.id}`, data)

    return response.data
}

export const deleteDevices = async (data: DeleteDeviceType) => {
    const response = await axiosInstance.post(`/api/devices/delete`, data)

    return response.data
}

export const bulkDeviceSettingsUpdate = async (data: BulkSettingsUpdateType) => {
    const response = await axiosInstance.post('/api/bulk/devices', data)

    return response.data
}

export const pushPullRecordToDevice = async (data: PushPullRecordType) => {
    const response = await axiosInstance.post(`/api/device/${data?.id}/${data?.action}`)

    return response.data
}
