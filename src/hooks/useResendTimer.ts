import { getItem, removeItem, setItem } from '@/utils/storage'
import { useState, useEffect, useCallback } from 'react'

type UseResendType = {
    displayText: string | null
    isTimerActive: boolean
    triggerCountdown: () => void
}

const DEFAULT_DURATION = 60
const RESET_TIMER = 'resendTimerEnd'

const getDisplayText = (duration: number): string => `Resend in ${duration} seconds`

const getInitialSeconds = (duration: number): number => {
    const storedEndTime = getItem<number>(RESET_TIMER)

    if (storedEndTime) {
        const currentTime = new Date().getTime()
        const endTime = storedEndTime
        const secondsLeft = (endTime - currentTime) / 1000
        return secondsLeft > 0 ? Math.round(secondsLeft) : 0
    }

    return duration
}

// Can be invoked without arguments due to default being 60 seconds
// Just pass a dynamic argument like 120 seconds should the whole Zentive team / QA team discuss about it
// 120 seconds is used on other apps such as RoboBurger
export const useResendTimer = (duration: number = DEFAULT_DURATION): UseResendType => {
    const [seconds, setSeconds] = useState<number>(() => getInitialSeconds(duration))
    const [isTimerActive, setIsTimerActive] = useState<boolean>(seconds > 0)
    const [displayText, setDisplayText] = useState<string | null>(() => getDisplayText(seconds))

    const triggerCountdown = useCallback(() => {
        const newEndTime = new Date().getTime() + duration * 1000
        setItem(RESET_TIMER, newEndTime.toString())
        setSeconds(duration)
        setIsTimerActive(true)
        setDisplayText(() => getDisplayText(duration))
    }, [duration])

    useEffect(() => {
        if (seconds <= 0) {
            setIsTimerActive(false)
            setDisplayText(null)
            removeItem(RESET_TIMER)
            return
        }

        let interval: NodeJS.Timeout | null = null

        if (isTimerActive) {
            interval = setInterval(() => {
                const currentTime = new Date().getTime()
                const storedEndTime = getItem<number>(RESET_TIMER) || 0
                const secondsLeft = (storedEndTime - currentTime) / 1000

                if (secondsLeft <= 0) {
                    clearInterval(interval as NodeJS.Timeout)
                    setIsTimerActive(false)
                    setDisplayText(null)
                    removeItem(RESET_TIMER)
                } else {
                    setSeconds(Math.round(secondsLeft))
                    setDisplayText(() => getDisplayText(Math.round(secondsLeft)))
                }
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isTimerActive, seconds])

    return { displayText, isTimerActive, triggerCountdown }
}
