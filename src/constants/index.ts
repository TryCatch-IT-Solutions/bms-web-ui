export const AT_LEAST_TWO_CHARACTERS = 'must be at least 2 characters long'
export const AT_LEAST_FOUR_CHARACTERS = 'must be at least 4 characters long'
export const INVALID = 'is invalid'
export const INVALID_CURRENT_PASSWORD = 'Invalid current password'
export const INVALID_WEBSITE = 'Invalid website format. Example: example.com'
export const NO_INVALID_CHARACTERS = 'must not contain invalid characters'
export const NO_OLD_PASSWORD = 'New password must differ from your current password.'
export const NO_WHITE_SPACES = 'must not contain white spaces'
export const NO_WHITE_SPACES_END = 'cannot end with a space'
export const NO_WHITE_SPACES_START = 'cannot start with a space'
export const NOT_FOUND = 'not found'
export const PHONE_NUMBER = 'Phone Number'
export const REQUIRED = 'is required'
export const SELECT_VALID_STREET_ADDRESS =
    'Please type and select a valid Street Address from the dropdown'

export const ROLE = {
    superadmin: 'superadmin' as string,
    groupadmin: 'groupadmin' as string,
    employee: 'employee' as string,
} as const

export const ROLE_LABELS = {
    superadmin: 'Super Admin' as string,
    groupadmin: 'Group Admin' as string,
    employee: 'Employee' as string,
} as const

export const USER_STATUS = {
    ACTIVATED: 'active',
    INACTIVE: 'inactive',
} as const

export const ROLE_VALUES = Object.entries(ROLE_LABELS).map(([key, label]) => ({
    value: key, // Use the key as the value
    label: label, // Use the value as the label
}))

export const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
]

export const TEMP_GROUP = [
    { value: 1, label: 'Group 1' },
    { value: 2, label: 'Group 2' },
]

export const TEMP_DEVICE = [
    { value: 1, label: 'Device 1' },
    { value: 2, label: 'Device 2' },
]

export const TEMP_groupadmin = [
    { value: 1, label: 'Admin 1' },
    { value: 2, label: 'Admin 2' },
]

export const LAPTOP_MAX_WIDTH = 1425
