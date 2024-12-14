import { axiosInstance } from '@/api/axiosInstance'
import { CreateDeviceType, DeviceListType } from '@/api/device/schema'

export const createDevice = async (data: CreateDeviceType) => {
    const response = await axiosInstance.post('/api/devices/create', data)

    return response.data
}

export const getDeviceList = async (): Promise<DeviceListType> => {
    const response = await axiosInstance.get(`/api/devices`)

    return response.data
}
