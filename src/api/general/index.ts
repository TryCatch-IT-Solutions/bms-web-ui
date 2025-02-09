import { axiosInstance } from '../axiosInstance'
import { DashboardStatusType } from './schema'

export const getDashboardStats = async (): Promise<DashboardStatusType> => {
    const res = await axiosInstance.get('/api/dashboard/stats')

    return res.data
}
