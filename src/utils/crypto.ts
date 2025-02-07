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

// Function to mask a string like "test" to "****"
export const maskString = (inputString: string) => {
    return inputString.replace(/./g, '*')
}

export const maskApiKey = (key: string) => {
    if (key?.length <= 5) {
        // If the key has 5 or fewer characters, mask the entire key
        return '*'.repeat(key?.length)
    } else {
        // Otherwise, show the last 5 characters and mask the rest
        const start = '*'.repeat(key?.length - 5) // Mask all characters except the last 5
        const end = key?.substring(key?.length - 5) // Last 5 characters
        return start + end
    }
}
