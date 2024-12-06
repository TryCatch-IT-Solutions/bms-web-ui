// Validation error messages
export const AT_LEAST_TWO_CHARACTERS = 'must be at least 2 characters long'
export const AT_LEAST_FOUR_CHARACTERS = 'must be at least 4 characters long'
export const EMPTY_UUID = '00000000-0000-0000-0000-000000000000'
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
    ADMIN: 'ADMIN' as string,
    OWNER: 'OWNER' as string,
    CREW: 'CREW' as string,
    CUSTOMER: 'CUSTOMER' as string,
    CO_OWNER: 'CO_OWNER' as string,
} as const

export const ROLE_NAME = {
    ADMIN: 'Super Admin' as string,
    OWNER: 'Owner' as string,
    CREW: 'Crew' as string,
} as const

// Styles
export const PAYMENT_BTN_STYLE = 'w-full h-[43px] rounded-[4px]'
export const PAYMENT_FIELD_STYLE =
    'w-full rounded-sm border-solid border-[1px] border-zentive-gray-medium px-3 py-3.5 text-sm h-[45px]'
export const SKLTN_PAYMENT_BTN_STYLE = 'w-full h-[43px] rounded-[4px] bg-[#f7f7f7]'
export const BREADCRUMBS_PADDING_STYLE = 'px-[70px] pt-[50px]'

// Time Format
export const ABBREVIATED_DATE_12_HOUR = 'MMM DD, YYYY h:mm A'
export const COMPLETED_DATE_12_HOUR = 'MMMM DD, YYYY h:mm A'
export const ABBREVIATED_MONTH_DAY_YEAR = 'MMM, DD, YYYY'
export const BASE_DATE = '2000-01-01'
export const DURATION = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
export const FULL_MONTH_WITH_DAY_AND_FULL_YEAR = 'MMMM DD, YYYY'
export const ISO_8601 = 'YYYY-MM-DD'
export const ISO_8601_WITH_UTC_OFFSET = 'YYYY-MM-DD HH:mm:ss ZZ'
export const ISO_8601_WITH_UTC_OFFSET_IOS = 'YYYY-MM-DD HH:mm:ssZ'
export const TWELVE_HOUR_CLOCK_WITH_MERIDIEM = 'h:mm A'
export const TWENTY_FOUR_HOUR_CLOCK = 'HH:mm'
export const US_FORMAT = 'MM/DD/YYYY'
export const COMPLETE_FORMAT_WITHOUT_TIME = 'MMMM DD, YYYY'
export const SPANISH_FORMAT_WITH_TIME = 'DD/MM/YYYY HH:mm'
export const SPANISH_FORMAT = 'DD/MM/YYYY'
export const US_FORMAT_WITH_TIME_MERIDIEM = 'MM/DD/YYYY, h:mm A'
export const COMPLETE_DATE_TIME_FORMAT_WITH_MERIDIEM = 'MMMM DD, YYYY h:mm A'
export const US_FORMAT_WITH_TIME_MERIDIEM_DAY = 'DD/MM/YYYY, HH:mm'
export const WEEKDAY_FULLNAME = 'dddd'
export const WEEK_LABELS = ['first', 'second', 'third', 'fourth', 'fifth']

// screen constant
export const LAPTOP_MAX_WIDTH = 1425
export const TABLET_MAX_WIDTH = 1024
export const MOBILE_MAX_WIDTH = 768
