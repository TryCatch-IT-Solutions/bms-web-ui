import { ENCRYPT_KEY } from '@/api/axiosInstance'
import CryptoJS from 'crypto-js'

export const encryptString = (text: string) => {
    const ciphertext = CryptoJS.AES.encrypt(text, ENCRYPT_KEY).toString()
    const encodedText = encodeURIComponent(ciphertext)
    return encodedText
}

export const decryptString = (ciphertext: string) => {
    const decodedText = decodeURIComponent(ciphertext)
    const bytes = CryptoJS.AES.decrypt(decodedText, ENCRYPT_KEY)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData
}
