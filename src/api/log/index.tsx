import { PaginationType } from '@/components/Pagination/schema'
import { LogsType } from './schema'
import { axiosInstance } from '../axiosInstance'

export const getLogList = async (p: PaginationType): Promise<LogsType> => {
    const response = await axiosInstance.get('/api/logs', {
        params: {
            page: p.current_page,
            limit: p.itemsPerPage,
            status: ['active'],
        },
    })

    return response.data
}