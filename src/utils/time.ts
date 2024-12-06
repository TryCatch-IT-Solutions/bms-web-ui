import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs, { ConfigType, Dayjs } from 'dayjs'
import {
    BASE_DATE,
    DURATION_ARGUMENTS,
    ISO_8601_WITH_UTC_OFFSET,
    ISO_8601_WITH_UTC_OFFSET_IOS,
    RECURRING_TYPES,
    TWELVE_HOUR_CLOCK_WITH_MERIDIEM,
    TWENTY_FOUR_HOUR_CLOCK,
    US_FORMAT,
} from '@/constants'
import { JobLogResponseType, ManipulateType, RepeatType } from '@/api/job/schema'
import { isIOS, isMacOs } from 'react-device-detect'

// Extend dayjs with the UTC plugin to allow for UTC time manipulation e.g. +0800
dayjs.extend(utc)
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.extend(isoWeeksInYear)
dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(duration)

export const CURRENT_YEAR = dayjs().year()

export const calculateEndDate = (
    startDate: string,
    duration: number,
    durationType: ManipulateType,
    repeat: RepeatType,
) => {
    let start = dayjs(startDate)
    // const end = start.add(duration, durationType)
    const increment = repeat === RECURRING_TYPES.BI_WEEKLY ? 2 : 1

    let lastVisit = start
    let numberOfWeeks = 0
    let occuranceFrequency = 0
    if (repeat === RECURRING_TYPES.WEEKLY || repeat === RECURRING_TYPES.BI_WEEKLY) {
        if (durationType == 'month') {
            numberOfWeeks = Math.round(duration * 4.345)
        } else if (durationType == 'year') {
            numberOfWeeks = Math.ceil(duration * 52.14)
        } else {
            numberOfWeeks = duration
        }

        if (repeat === RECURRING_TYPES.WEEKLY) {
            occuranceFrequency = numberOfWeeks
        } else {
            const totalVisits = Math.ceil(numberOfWeeks / 2)
            occuranceFrequency = totalVisits
        }
    } else if (repeat === RECURRING_TYPES.MONTHLY) {
        if (durationType == 'year') {
            occuranceFrequency = duration * 12
        } else {
            occuranceFrequency = duration
        }
    } else if (repeat === RECURRING_TYPES.DAILY) {
        switch (durationType) {
            case 'day':
                occuranceFrequency = duration
                break
            case 'week':
                occuranceFrequency = duration * 7
                break
            default:
                break
        }
    } else {
        occuranceFrequency = duration
    }

    while (occuranceFrequency !== 0) {
        lastVisit = start
        start = start.add(increment, DURATION_ARGUMENTS[repeat])
        occuranceFrequency--
    }

    return lastVisit.format(US_FORMAT)
}

export const calculateOccurrences = (startDate: string, endDate: string, repeat: RepeatType) => {
    const end = dayjs(endDate)
    let start = dayjs(startDate)
    let count = 0
    const increment = repeat === RECURRING_TYPES.BI_WEEKLY ? 2 : 1

    // Always include the start date as the first occurrence
    count++

    while (start.isBefore(end)) {
        start = start.add(increment, DURATION_ARGUMENTS[repeat])
        if (start.isBefore(end) || start.isSame(end, 'day')) {
            count++
        }
    }

    return count
}
export const extractDateAndTime = (day: ConfigType) => {
    const dayObject = dayjs(day)
    const formattedDate = dayObject.format(US_FORMAT)
    const formattedTime = dayObject.format(TWENTY_FOUR_HOUR_CLOCK)
    return [formattedDate, formattedTime]
}

export const generateDates = (startDate: string, endDate: string, repeat: RepeatType): string[] => {
    let currentDate = dayjs(startDate)
    const stopDate = dayjs(endDate)
    const resultDates: string[] = []

    while (currentDate.isBefore(stopDate) || currentDate.isSame(stopDate)) {
        resultDates.push(currentDate.format(US_FORMAT))
        currentDate = currentDate.add(1, DURATION_ARGUMENTS[repeat])
    }

    return resultDates
}

/**
 * Formats the provided date and time to a string with UTC offset and calls the onChange callback with this value.
 * This function is typically used to handle onChange events for datetime inputs, formatting the input value
 * into a standardized datetime string with UTC offset.
 *
 * @param date - The date as a string in the format YYYY-MM-DD.
 * @param time - The time as a string in 24-hour format HH:mm.
 * @param onChange - A callback function that takes a string parameter. This is called with the formatted datetime string.
 */
export const formatToDateTimeWithUTC = (
    date: string,
    time: string,
    onChange: (val: string) => void,
): void => {
    let combinedDate = dayjs(`${date}T${time}`).utcOffset(480).format(ISO_8601_WITH_UTC_OFFSET)

    onChange(combinedDate)
}

// Use for converting date and time with utc to 24-hour clock
/**
 * Converts a provided datetime string with UTC offset into a 24-hour clock time format.
 * This function is useful for displaying datetime strings stored in UTC format in a more readable 24-hour time format.
 *
 * @param dateAndTime - The datetime string with UTC offset to be converted.
 * @returns A string representing the time in 24-hour format (HH:mm).
 */

// TO DO:
// Rename to formatDateTime
// Replace and update all instances
export const formatTo24HourClock = (dateAndTime: string, format = TWENTY_FOUR_HOUR_CLOCK): string =>
    dayjs(dateAndTime).format(format)

export const formatToUTCWithOffset = (
    dateAndTime: string | number,
    timezone: string = 'Asia/Singapore',
    format: string = ISO_8601_WITH_UTC_OFFSET,
    from: string = '',
) => {
    dayjs.tz.setDefault('Asia/Singapore')
    if (from == 'General Format') {
        if (isIOS || isMacOs) {
            format = ISO_8601_WITH_UTC_OFFSET_IOS
        }
        console.log(timezone)
        const customerTime = dayjs(dateAndTime).tz(timezone).format(format)
        const serverTime = dayjs(customerTime)
            .tz('Asia/Singapore')
            .set('second', 0)
            .format(ISO_8601_WITH_UTC_OFFSET)
        return serverTime
    } else {
        const customerTime = dayjs(dateAndTime).tz(timezone).format(format)
        const serverTime = dayjs(customerTime).tz('Asia/Singapore').format(format)
        return serverTime
    }
}

export const formatDateToUserTimezone = (
    dateAndTime: string | number,
    timezone: string = 'Asia/Singapore',
    format: string = ISO_8601_WITH_UTC_OFFSET,
    from: string = '',
) => {
    dayjs.tz.setDefault('Asia/Singapore')
    if (from == 'General Format') {
        if (isIOS || isMacOs) {
            format = ISO_8601_WITH_UTC_OFFSET_IOS
        }
        const customerTime = dayjs(dateAndTime).tz(timezone).format(format)
        const serverTime = dayjs(customerTime).tz('Asia/Singapore').set('second', 0).format(format)
        return serverTime
    } else {
        const customerTime = dayjs(dateAndTime).tz(timezone).format(format)
        const serverTime = dayjs(customerTime).tz('Asia/Singapore').format(format)
        return serverTime
    }
}

export const formatToUTCWithOffsetIos = (dateAndTime: string, timezone: string, format: string) => {
    const formattedDate = dayjs(dateAndTime).tz(timezone).format(format)
    return formattedDate
}

export const getWeekOfMonthVerbiage = (date: Dayjs) => {
    const firstDayOfTheMonth = date.startOf('month').day()
    const dayOfMonth = date.date()
    const weekNumber = Math.ceil((dayOfMonth + firstDayOfTheMonth) / 7)

    const WEEK_LABELS = ['first', 'second', 'third', 'fourth', 'fifth']

    return WEEK_LABELS[weekNumber - 1]
}

export const formatWorkingHours = (hours: number) => {
    if (hours == undefined) return '00:00'

    const totalMinutes = Math.round(hours * 60)
    const hoursPart = Math.floor(totalMinutes / 60)
    const minutesPart = totalMinutes % 60

    const formattedDuration = `${String(hoursPart).padStart(2, '0')}:${String(minutesPart).padStart(
        2,
        '0',
    )}`
    return formattedDuration
}

export const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return day + 'th' // Handle 11th to 20th
    switch (day % 10) {
        case 1:
            return day + 'st'
        case 2:
            return day + 'nd'
        case 3:
            return day + 'rd'
        default:
            return day + 'th'
    }
}

export const getTimeDifference = (startDate: string, endDate: string): number => {
    const startHourMinute = dayjs(`${BASE_DATE} ${formatTo24HourClock(startDate)}`)
    const endHourMinute = dayjs(`${BASE_DATE} ${formatTo24HourClock(endDate)}`)

    return endHourMinute.diff(startHourMinute, 'h', true)
}

export const removeRecurringPrefix = (appointmentType: string) => {
    const prefix = 'RECURRING_'
    if (appointmentType.startsWith(prefix)) {
        return appointmentType.substring(prefix?.length) as RepeatType
    }
    return appointmentType as RepeatType
}

export const getJobLogStartTime = (job: JobLogResponseType, timezone: string) => {
    if (job?.dailyTimeRecord && job?.jobCrewMembers) {
        const filteredRecords = job?.dailyTimeRecord?.filter(
            (dtr) =>
                job?.jobCrewMembers?.some(
                    (member) => member.jobCrewMemberId === dtr.jobCrewMemberId,
                ),
        )

        if (filteredRecords?.length > 0) {
            return dayjs(filteredRecords[0].time)
                .tz(timezone)
                .format(TWELVE_HOUR_CLOCK_WITH_MERIDIEM)
        } else {
            return '--'
        }
    } else {
        return '--'
    }
}

export const getJobLogEndTime = (job: JobLogResponseType, timezone: string) => {
    if (job?.dailyTimeRecord && job?.jobCrewMembers) {
        const foremanJobCrewMemberId = job?.jobCrewMembers.find(
            (member) => member.crewMemberId == job?.foremanId,
        )
        const filteredEndRecords = job?.dailyTimeRecord?.find(
            (dtr) =>
                dtr?.jobCrewMemberId === foremanJobCrewMemberId?.jobCrewMemberId &&
                dtr?.type === 'end',
        )
        if (filteredEndRecords) {
            return dayjs(filteredEndRecords.time)
                .tz(timezone)
                .format(TWELVE_HOUR_CLOCK_WITH_MERIDIEM)
        } else {
            return '--'
        }
    } else {
        return '--'
    }
}

export const formatToCustomerTime = (time: string, timezone: string = 'Asia/Singapore') => {
    const sampleDate = dayjs(time)

    const finalDate = dayjs
        .tz(
            `${sampleDate.year()}-${(sampleDate.month() + 1)
                .toString()
                .padStart(2, '0')}-${sampleDate.date().toString().padStart(2, '0')} ` +
                `${sampleDate.hour().toString().padStart(2, '0')}:${sampleDate
                    .minute()
                    .toString()
                    .padStart(2, '0')}:${sampleDate.second().toString().padStart(2, '0')}`,
            timezone,
        )
        .format(ISO_8601_WITH_UTC_OFFSET)

    return finalDate
}
