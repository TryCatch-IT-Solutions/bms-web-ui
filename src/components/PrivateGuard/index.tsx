import { signOut } from '@/api/auth'
import goTrueClient from '@/api/goTrueClient'
import { EMPTY_UUID, ROLE, US_FORMAT } from '@/constants'
import {
    isViewedAsAtom,
    rememberMeAtom,
    timezoneAtom,
    userAtom,
    viewedAsUserAtom,
    businessIdAtom,
    ownerFreeTrialEndedForCrewAtom,
} from '@/store/auth'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import React, { startTransition, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isOwnerOrCustomer } from '@/utils/user'
import { previousPathAtom } from '@/store/path'
import usePathname from '@/hooks/usePathname'
import dayjs from 'dayjs'
import { freeTrialAtom, isFreeTrialEndedAtom } from '@/store/owner'
import { SUBSCRIPTION_TYPES } from '@/constants'
import { useNavigate } from 'react-router-dom'
import useStripeConnectStatus from '@/hooks/useStripeConnectStatus'
import FullSpinner from '@/components/FullSpinner'
import { getEmailConfirmedAt } from '@/api/owner'
import { useQuery } from '@tanstack/react-query'
import { TimeZoneResult } from '@/hooks/useGeocode'
import { checkFreeTrialOwner } from '@/api/profile'

type PrivateGuardType = {
    children: React.ReactNode
}

const customerPortalCreatePassword = '/customer-portal/create-password'
const ownerResetPassword = '/reset-password'
const crewPortalCreatePassword = '/crew/create-password'

const CP = '/customer-portal'
const FM = '/financial-management'

// Financial Reports
const FR = '/reports'

const PATHS_REQUIRING_STRIPE_CONNECT = [
    `${CP}/invoices`,
    `${CP}/payments`,
    `${CP}/payments/billing-info`,
    `${CP}/payments/checkout`,
    `${CP}/payments/payment-info`,
    `${CP}/refunds`,
    `${FM}/invoicing`,
    'settings/reimbursement',
    `${FR}/gross-net-income`,
    `${FR}/job-completion-reports`,
    `${FR}/jobs-completed-employee-reports`,
    `${FR}/invoice-reports`,
    // `${FR}/quote-reports`,
    `${FR}/expense-reports`,
    `${FR}/revenue`,
]

export const PrivateGuard = ({ children }: PrivateGuardType) => {
    const [user, setUser] = useAtom(userAtom)
    const [isViewedAsOwner, setIsViewAsSubscriber] = useAtom(isViewedAsAtom)
    const currentUser = useAtomValue(isViewedAsOwner ? viewedAsUserAtom : userAtom)
    const { pathname } = useLocation()
    const previousPath = useAtomValue(previousPathAtom)
    const rememberMe = useAtomValue(rememberMeAtom)
    const setOwner = useSetAtom(viewedAsUserAtom)
    const setTimezone = useSetAtom(timezoneAtom)
    const setFreeTrial = useSetAtom(freeTrialAtom)
    const timezone = useAtomValue(timezoneAtom) as TimeZoneResult
    const { data: isConnectedToStripe, isLoading } = useStripeConnectStatus()
    const businessId = useAtomValue(businessIdAtom)
    const setBusinessId = useSetAtom(businessIdAtom)
    const isOwnerFreeTrialEndedForCrew = useAtomValue(ownerFreeTrialEndedForCrewAtom)

    const navigate = useNavigate()

    const [_, setIsFreeTrialEnded] = useAtom(isFreeTrialEndedAtom)

    usePathname()

    const {
        data: emailConfirmedAt,
        isSuccess,
        isPending,
    } = useQuery({
        enabled: !!(
            currentUser?.role.roleName === ROLE.OWNER &&
            currentUser?.business?.subscriptionType?.name === SUBSCRIPTION_TYPES.FREE_TRIAL
        ),
        queryKey: ['emailConfirmedAt', currentUser?.profileId],
        queryFn: () => getEmailConfirmedAt(currentUser?.profileId as string),
    })

    const { data: isFreeTrialHasEnded } = useQuery({
        enabled:
            currentUser?.role.roleName === ROLE.CREW &&
            currentUser?.business?.subscriptionType?.name === SUBSCRIPTION_TYPES.FREE_TRIAL,
        refetchInterval: 10000,
        queryKey: ['isFreeTrialHasEnded', currentUser?.businessId],
        queryFn: () => checkFreeTrialOwner(currentUser?.businessId as string),
    })

    useEffect(() => {
        if (!isSuccess && isLoading && isPending) {
            return
        }

        startTransition(() => {
            const confirmedDate = emailConfirmedAt

            const ownerEmailConfirmedDate = dayjs(confirmedDate)
                .tz(timezone?.timeZoneId)
                .format(US_FORMAT)

            const endOfTrial = dayjs(confirmedDate)
                .tz(timezone?.timeZoneId)
                .add(14, 'day')

            const currentDate = dayjs().tz(timezone?.timeZoneId)

            const daysLeft = endOfTrial.diff(dayjs(currentDate), 'day')

            setFreeTrial({
                ownerEmailConfirmedDate: ownerEmailConfirmedDate.toString(),
                endOfTrial: endOfTrial.format(US_FORMAT),
                currentDate: currentDate.toString(),
                daysLeft,
            })

            if (
                daysLeft <= 0 &&
                currentUser?.role?.roleName === ROLE.OWNER &&
                currentUser?.business?.subscriptionType?.name === SUBSCRIPTION_TYPES.FREE_TRIAL
            ) {
                setIsFreeTrialEnded(true)
                navigate('/owner-subscription/end-trial')
            }
        })
    }, [currentUser, isSuccess])

    useEffect(() => {
        const { data: authListener } = goTrueClient.onAuthStateChange((event, session) => {
            startTransition(() => {
                switch (event) {
                    case 'SIGNED_IN':
                        if (user?.business.subscriptionTypeId === EMPTY_UUID) {
                            console.log('DO SOMETHING WITH NO SUBSCRIPTION')
                        }
                        break
                    case 'TOKEN_REFRESHED':
                        if (!rememberMe) {
                            signOut()
                        }
                        if (!session) {
                            setIsViewAsSubscriber(false)
                            setUser(null)
                        }
                        break
                    case 'SIGNED_OUT':
                        setIsViewAsSubscriber(RESET)
                        setOwner(RESET)
                        setTimezone(RESET)
                        setUser(null)
                        setBusinessId(RESET)
                        break
                    default:
                        break
                }
            })
        })

        return () => {
            if (authListener?.subscription?.unsubscribe) {
                authListener.subscription.unsubscribe()
            }
        }
    }, []) // Empty dependency array unless currentUser is necessary

    useEffect(() => {
        if (
            user !== null &&
            currentUser?.role.roleName === ROLE.CREW &&
            currentUser?.business?.subscriptionType?.name === SUBSCRIPTION_TYPES.FREE_TRIAL &&
            isFreeTrialHasEnded
        ) {
            signOut()
            navigate('/crew/signed-out')
        }
    }, [isFreeTrialHasEnded])

    if (isLoading) {
        return <FullSpinner />
    }

    if (user === null && !isOwnerFreeTrialEndedForCrew) {
        return <Navigate to='/' />
    }

    if (user === null && isOwnerFreeTrialEndedForCrew) {
        return <Navigate to='/crew/expired' />
    }

    if (
        user?.role?.roleName === ROLE.CUSTOMER &&
        user?.isPasswordGenerated &&
        pathname !== customerPortalCreatePassword
    ) {
        return <Navigate to={customerPortalCreatePassword} />
    }

    if (user?.role?.roleName === ROLE.CO_OWNER && user?.isPasswordGenerated) {
        return <Navigate to={ownerResetPassword} />
    }

    if (
        user?.role?.roleName === 'CREW' &&
        user?.isPasswordGenerated &&
        pathname !== crewPortalCreatePassword
    ) {
        return <Navigate to={crewPortalCreatePassword} />
    }

    if (pathname.startsWith('/crew') && isOwnerOrCustomer(user?.role.roleName as string)) {
        return <Navigate to={previousPath} />
    }

    if (!pathname.startsWith('/crew') && user?.role.roleName === ROLE.CREW) {
        return <Navigate to={previousPath} />
    }

    const shouldRestrict =
        PATHS_REQUIRING_STRIPE_CONNECT.filter((path) => pathname.includes(path))?.length &&
        businessId &&
        isConnectedToStripe === false

    if (
        shouldRestrict &&
        (user?.role?.roleName === ROLE.OWNER || user?.role.roleName === ROLE.CO_OWNER)
    ) {
        return <Navigate to='/dashboard' />
    }

    if (shouldRestrict && user?.role?.roleName === ROLE.CUSTOMER) {
        return <Navigate to='/customer-portal/quotes' />
    }

    return children
}
