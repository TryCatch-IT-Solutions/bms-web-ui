type StorageKey = string

export const getItem = <T>(key: StorageKey): T | null => {
    try {
        const item = localStorage.getItem(key)
        return item ? (JSON.parse(item) as T) : null
    } catch (error) {
        console.warn(`Error reading '${key}' from localStorage:`, error)
        return null
    }
}

export const removeItem = (key: StorageKey): void => localStorage.removeItem(key)

export const setItem = <T>(key: StorageKey, value: T): void => {
    try {
        const serializedItem = JSON.stringify(value)
        localStorage.setItem(key, serializedItem)
    } catch (error) {
        console.error(`Error saving '${key}' to localStorage:`, error)
    }
}
