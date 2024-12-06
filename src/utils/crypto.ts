import CryptoJS from 'crypto-js'

const KEY = import.meta.env.VITE_ENCRYPT_KEY as string

export const encryptString = (text: string) => {
    const ciphertext = CryptoJS.AES.encrypt(text, KEY).toString()
    const encodedText = encodeURIComponent(ciphertext)
    return encodedText
}

export const decryptString = (ciphertext: string) => {
    const decodedText = decodeURIComponent(ciphertext)
    const bytes = CryptoJS.AES.decrypt(decodedText, KEY)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData
}
