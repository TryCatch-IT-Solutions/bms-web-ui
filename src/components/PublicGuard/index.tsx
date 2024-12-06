import { Navigate, useLocation } from 'react-router-dom'
import { useAtom, useSetAtom } from 'jotai'
import { businessIdAtom, sessionAtom, userAtom } from '@/store/auth'
import { ROLE, USER_STATUS } from '@/constants'
import { useEffect } from 'react'
import PublicRoutes from '@/routes/PublicRoutes'
import { paymentStepAtom } from '@/store/payment'
import { RESET } from 'jotai/utils'
import usePathname from '@/hooks/usePathname'
import { getCustomerConnectedBusinesses } from '@/api/business'
import { useQuery } from '@tanstack/react-query'
import useStripeConnectStatus from '@/hooks/useStripeConnectStatus'
import FullSpinner from '../FullSpinner'
import { checkOwnerActiveStatus } from '@/api/profile'
import { toast } from '@/hooks/useToast'

type PublicGuardType = {
    children: React.ReactNode
}

const PublicGuard = ({ children }: PublicGuardType) => {
    const { hash, pathname } = useLocation()
    const [session, setSession] = useAtom(sessionAtom)
    const [user, setUser] = useAtom(userAtom)
    const setCurrentStep = useSetAtom(paymentStepAtom)
    const [businessId, setBusinessId] = useAtom(businessIdAtom)

    const errorCode = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash).get(
        'error_code',
    )

    const isActive = user?.status === USER_STATUS.ACTIVATED
    const isActiveCustomer = isActive && user?.role?.roleName === ROLE.CUSTOMER
    const isActiveCrew = isActive && user?.role?.roleName === ROLE.CREW
    const isActiveOwner =
        (isActive || user?.status === USER_STATUS.BILLING_PAUSED) &&
        user?.role?.roleName === ROLE.OWNER
    const isAdmin = user?.role.roleName === ROLE.ADMIN

    const {
        data: businesses,
        isSuccess: isCustomerBusinessesSuccess,
        isLoading: isCustomerBusinessesLoading,
    } = useQuery({
        enabled: isActiveCustomer && !!user?.profileId,
        queryKey: ['customerBusinesses', user?.profileId],
        queryFn: () => getCustomerConnectedBusinesses(user?.profileId),
    })

    const {
        data: isConnectedToStripe,
        isSuccess: isConnectToStripeSuccess,
        isLoading: isConnectedToStripeLoading,
    } = useStripeConnectStatus()

    const checkOwnerStatus = async (businessId: string) => {
        try {
            const isActive = await checkOwnerActiveStatus(businessId)
            if (isActive) {
                setBusinessId(businessId)
            } else {
                toast({
                    description: 'Account Restricted: Business no longer active',
                    duration: 2000,
                    variant: 'destructive',
                })
            }
        } catch (err) {
            toast({
                description: 'Account Restricted: Business no longer active',
                duration: 2000,
                variant: 'destructive',
            })
        }
    }

    usePathname()

    useEffect(() => {
        if (pathname === '/verified' || pathname === '/invite-result') {
            setUser(null)
        }
    }, [])

    useEffect(() => {
        const publicRoutesException =
            PublicRoutes?.children?.some((child) => child.path === pathname) &&
            !pathname.includes('/free-trial') &&
            !pathname.includes('/payment') &&
            !pathname.includes('/verified') &&
            !pathname.includes('/reset-password')

        if (publicRoutesException && session && user === null) {
            // If owner user navigates away from '/payment' route and currently on step 2
            // signOut() // remove from LS
            setSession(RESET) // remove from js memory and LS
            setCurrentStep(RESET)
        }
    }, [pathname])

    useEffect(() => {
        if (isActiveCustomer && isCustomerBusinessesSuccess && businesses?.length === 1) {
            checkOwnerStatus(businesses[0].businessId)
        }
    }, [isActiveCustomer, businesses, isCustomerBusinessesSuccess])

    if (user && (isCustomerBusinessesLoading || isConnectedToStripeLoading)) {
        return <FullSpinner />
    }

    if (errorCode) {
        return (
            <Navigate
                to='/error'
                replace
                state={{
                    error: errorCode,
                    message: 'Unauthorized: Access is denied due to invalid credentials.',
                }}
            />
        )
    }

    if (
        isActiveCustomer &&
        isCustomerBusinessesSuccess &&
        session &&
        businesses?.length > 1 &&
        !businessId
    ) {
        return <Navigate to='/customer-portal/select-business' />
    }

    if (isActiveCustomer && isCustomerBusinessesSuccess && session && isConnectToStripeSuccess) {
        return <Navigate to={`/customer-portal/${isConnectedToStripe ? 'payments' : 'quotes'}`} />
    }

    if ((isActiveOwner || isAdmin) && session) {
        return <Navigate to='/dashboard' replace />
    }

    if (isActiveCrew && session) {
        return <Navigate to='/crew/jobs' replace />
    }

    if (pathname === '/payment' && !session) {
        return <Navigate to='/sign-in' replace />
    }

    if (user && (pathname === '/verified' || pathname === '/invite-result')) {
        return children
    }

    return children
}

export default PublicGuard
