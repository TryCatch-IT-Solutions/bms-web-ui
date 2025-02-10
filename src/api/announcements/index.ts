import { PaginationType } from '@/components/Pagination/schema'
import { AnnouncementListType, CreateAnnouncementType } from './schema'
import { axiosInstance } from '../axiosInstance'

export const getAnnouncement = async (
    p: PaginationType,
    userNotif: string,
): Promise<AnnouncementListType> => {
    let gen = 1

    if (userNotif === 'general') {
        gen = 1
    } else {
        gen = 0
    }

    const params = {
        params: {
            current_page: p.current_page,
            general: gen,
        },
    }

    const response = await axiosInstance.get('/api/announcements', params)

    return response.data
}

export const creteAnnouncement = async (data: CreateAnnouncementType) => {
    const response = await axiosInstance.post('/api/announcements', data)

    return response.data
}
