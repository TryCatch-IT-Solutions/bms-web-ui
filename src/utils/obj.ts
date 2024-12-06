export const hasProperty = <T extends object, K extends keyof T>(
    obj: T | null,
    key: K,
): obj is T => {
    return obj !== null && key in obj
}
