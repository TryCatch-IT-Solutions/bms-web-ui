import { axiosInstance } from '@/api/axiosInstance'
import { CreateDeviceType, DeviceListType, DeviceType } from '@/api/device/schema'

export const createDevice = async (data: CreateDeviceType) => {
    const response = await axiosInstance.post('/api/devices/create', data)

    return response.data
}

export const getDeviceList = async (): Promise<DeviceListType> => {
    const response = await axiosInstance.get(`/api/devices`)

    return response.data
}

export const getDeviceById = async (id: number): Promise<DeviceType> => {
    const response = await axiosInstance.get(`/api/device/${id}`)

    return response.data
}

export const updateDevice = async (data: DeviceType): Promise<DeviceType> => {
    const response = await axiosInstance.post(`/api/device/${data?.id}`, data)

    return response.data
}
