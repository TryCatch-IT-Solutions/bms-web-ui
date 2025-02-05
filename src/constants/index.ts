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

export const EMP_ASSIGN_STATUS_TABS = {
    assigned: 'assigned' as string,
    unassigned: 'unassigned' as string,
    archive: 'archive' as string,
} as const

export const USER_ASSIGN_STATUS_TABS = {
    assigned: 'assigned' as string,
    unassigned: 'unassigned' as string,
    archive: 'archive' as string,
} as const

export const ROLE_LABELS = {
    superadmin: 'Super Admin' as string,
    groupadmin: 'Group Admin' as string,
    employee: 'Employee' as string,
} as const

export const EDIT_ROLE_LABELS = {
    superadmin: 'Super Admin' as string,
    groupadmin: 'Group Admin' as string,
} as const

export const USER_STATUS = {
    ACTIVATED: 'active',
    INACTIVE: 'inactive',
} as const

export const USER_PROFILE_TABS = {
    PROFILE: 'profile',
    PASSWORD: 'password',
}

export const ROLE_VALUES = Object.entries(ROLE_LABELS).map(([key, label]) => ({
    value: key, // Use the key as the value
    label: label, // Use the value as the label
}))

export const EDIT_ROLE_VALUES = Object.entries(EDIT_ROLE_LABELS).map(([key, label]) => ({
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

export const USER_FILTER_OPTIONS = [
    { value: 'groupadmin', label: 'Group Admin' },
    { value: 'superadmin', label: 'Super Admin' },
]

export const USER_ASSIGN_STATUS = [
    { value: false, label: 'Assigned' },
    { value: true, label: 'Unassigned' },
]

export const TIME_DATE_FORMAT = {
    DATE_TIME: 'MMM DD, YYYY HH:mm A',
    DATE: 'MMM DD, YYYY',
    EXPORT_DATE_TIME: 'YYYY-MM-DD HH:mm',
}

export const EXCLUDED_ROUTES = ['/dashboard', '/user/my-profile']

export const allowedNavigationLinks = [
    { href: '/dashboard', allowedRoles: [ROLE.superadmin, ROLE.groupadmin], dynamic: false },
    { href: '/user/list', allowedRoles: [ROLE.superadmin], dynamic: false },
    { href: '/user/register', allowedRoles: [ROLE.superadmin], dynamic: false },
    { href: '/group/list', allowedRoles: [ROLE.superadmin], dynamic: false },
    { href: '/group/create', allowedRoles: [ROLE.superadmin], dynamic: false },
    { href: '/group/user-group', allowedRoles: [ROLE.groupadmin], dynamic: false },
    { href: '/device/list', allowedRoles: [ROLE.superadmin], dynamic: false },
    { href: '/device/create', allowedRoles: [ROLE.superadmin], dynamic: false },
    { href: '/device/map-view', allowedRoles: [ROLE.superadmin], dynamic: false },
    { href: '/employee/create', allowedRoles: [ROLE.groupadmin, ROLE.superadmin], dynamic: false },
    {
        href: '/employee/time-entries',
        allowedRoles: [ROLE.groupadmin, ROLE.superadmin],
        dynamic: false,
    },
    { href: '/employee/list', allowedRoles: [ROLE.groupadmin, ROLE.superadmin], dynamic: false },
    { href: '/log/activity', allowedRoles: [ROLE.superadmin], dynamic: false },
    {
        href: '/settings/api-keys',
        allowedRoles: [ROLE.superadmin],
        dynamic: false,
    },

    // Add dynamic edit URLs

    {
        href: `/user/edit`,
        allowedRoles: [ROLE.superadmin],
        dynamic: true,
    },
    {
        href: `/group/edit`,
        allowedRoles: [ROLE.superadmin],
        dynamic: true,
    },
    {
        href: `/device/edit`,
        allowedRoles: [ROLE.superadmin],
        dynamic: true,
    },
    {
        href: `/employee/edit`,
        allowedRoles: [ROLE.groupadmin, ROLE.superadmin],
        dynamic: true,
    },
    {
        href: `/employee/time-entries/map-view`,
        allowedRoles: [ROLE.superadmin],
        dynamic: true,
    },
]

export const API_KEY_LABELS = {
    SMS: 'SMS_API_KEY',
    EMAIL: 'EMAIL_API_KEY',
    MAPS: 'MAPS_API_KEY',
    APP: 'APP_TOKEN',
}
