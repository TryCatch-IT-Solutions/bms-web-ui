import { axiosInstance } from '@/api/axiosInstance'
import { CreateDeviceType, DeleteDeviceType, DeviceListType, DeviceType } from '@/api/device/schema'
import { PaginationType } from '@/components/Pagination/schema'

export const createDevice = async (data: CreateDeviceType) => {
    const response = await axiosInstance.post('/api/devices/create', data)

    return response.data
}

export const getDeviceList = async (p: PaginationType, search: string): Promise<DeviceListType> => {
    const response = await axiosInstance.get(`/api/devices`, {
        params: {
            page: p.current_page,
            limit: p.itemsPerPage,
            status: ['active'],
            search: search,
        },
    })

    return response.data
}

export const getDeviceMapView = async (): Promise<DeviceType[]> => {
    const response = await axiosInstance.get(`/api/devices`)

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
