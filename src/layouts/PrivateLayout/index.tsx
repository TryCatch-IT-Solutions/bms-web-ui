import { Toaster } from '@/components/Toaster'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { Topbar } from './TopBar'
import { Sidebar } from './SideBar'
import { cn } from '@/utils/helper'
import { allowedNavigationLinks, EXCLUDED_ROUTES, LAPTOP_MAX_WIDTH } from '@/constants'
import { useMediaQuery } from 'react-responsive'
import { useAtomValue } from 'jotai'
import { tokenAtom, userAtom } from '@/store/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { verifyToken } from '@/api/auth'
import MobileMenu from './SideBar/MenuChild/MobileMenu'
import { Footer } from './Footer'

const PrivateLayout = () => {
    const xl_vw_already = useMediaQuery({ maxWidth: LAPTOP_MAX_WIDTH })
    const token = useAtomValue(tokenAtom)
    const user = useAtomValue(userAtom)

    const path = useLocation()
    const { id } = useParams()

    const { signOut } = useAuth()

    const queryClient = useQueryClient()

    const { data: isTokenValid, isLoading } = useQuery({
        queryKey: ['privateTokenKey', token],
        queryFn: verifyToken,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    })

    useEffect(() => {
        const shouldSignOut =
            !isLoading && (isTokenValid === undefined || !isTokenValid || token === null)

        if (shouldSignOut) {
            queryClient.invalidateQueries({ queryKey: ['publicTokenKey'] })
            signOut()
        }
    }, [isTokenValid, isLoading, token])

    const isPathPresentInNavigation = (
        path: string,
        items: { href: string; allowedRoles: string[]; dynamic: boolean }[],
    ) => {
        if (isLoading) {
            return true
        }
        if (EXCLUDED_ROUTES.includes(path)) {
            return true
        }

        for (const item of items) {
            if (item.dynamic === true) {
                const trimmedPath = path.replace('/' + id, '')
                if (trimmedPath === item.href) {
                    return item.allowedRoles.includes(user?.role ?? '')
                }
            } else {
                if (item.href === path) {
                    return item.allowedRoles.includes(user?.role ?? '')
                }
            }
        }

        return false
    }

    // Validate if the current path exists in the allowed navigation links
    const isPathValid = isPathPresentInNavigation(path.pathname, allowedNavigationLinks)

    if (!isPathValid) {
        // Optionally handle invalid path (redirect to a 401 page)
        return <Navigate to='/401' replace />
    }

    return (
        <div>
            <Toaster />
            <Topbar />
            <MobileMenu />
            <Sidebar />
            <main className={cn('bg-zentive-gray-bg relative', !xl_vw_already ? 'lg:pl-72' : '')}>
                <div className='px-4 sm:px-6 lg:px-8'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default PrivateLayout
