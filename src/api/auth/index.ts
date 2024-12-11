import { axiosInstance } from '../axiosInstance'
import { SignInResponseType, SignInType } from './schema'

export const signIn = async (data: SignInType): Promise<SignInResponseType> => {
    const response = await axiosInstance.post('/api/login', data)

    return response.data as SignInResponseType
}

export const signOut = async () => {
    const response = await axiosInstance.post('/api/logout')

    return response
}
