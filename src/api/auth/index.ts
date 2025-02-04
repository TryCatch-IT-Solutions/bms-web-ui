import { axiosInstance } from '../axiosInstance'
import {
    ForgotPasswordType,
    OverridePasswordType,
    SignInResponseType,
    SignInType,
    UpdatePasswordType,
    UpdateUserPasswordType,
} from './schema'

export const signIn = async (data: SignInType): Promise<SignInResponseType> => {
    const response = await axiosInstance.post('/api/login', data)

    return response.data as SignInResponseType
}

export const signOut = async () => {
    const response = await axiosInstance.post('/api/logout')

    return response
}

export const verifyToken = async () => {
    const response = await axiosInstance.get('/api/verify-token')

    return response.data
}

export const createNewPassword = async (data: UpdatePasswordType) => {
    const response = await axiosInstance.post(
        `/api/reset-password?token=${data.token}&email=${data.email}`,
        data,
    )

    return response.data
}

export const forgotPassword = async (data: ForgotPasswordType) => {
    const response = await axiosInstance.post('/api/forgot-password', data)

    return response.data
}

export const updateUserPassword = async (data: UpdateUserPasswordType) => {
    const response = await axiosInstance.post(`/api/user/${data.id}/updatePassword`, data)

    return response.data
}

export const overridePassowrd = async (data: OverridePasswordType) => {
    const response = await axiosInstance.post(`/api/user/${data.id}/updatePassword`, data)

    return response.data
}
