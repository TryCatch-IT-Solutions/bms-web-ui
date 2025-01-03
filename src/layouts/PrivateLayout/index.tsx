import { Toaster } from '@/components/Toaster'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Topbar } from './TopBar'
import { navigationItems, NavigationProps, Sidebar } from './SideBar'
import { cn } from '@/utils/helper'
import { EXCLUDED_ROUTES, LAPTOP_MAX_WIDTH } from '@/constants'
import { useMediaQuery } from 'react-responsive'
import { useAtomValue } from 'jotai'
import { tokenAtom, userAtom } from '@/store/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { verifyToken } from '@/api/auth'
import MobileMenu from './SideBar/MenuChild/MobileMenu'
import { getAllowedNavigationItems } from '@/utils/navigation'

const PrivateLayout = () => {
    const xl_vw_already = useMediaQuery({ maxWidth: LAPTOP_MAX_WIDTH })
    const token = useAtomValue(tokenAtom)
    const user = useAtomValue(userAtom)

    const path = useLocation().pathname

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

    const allowedNavigationItems = getAllowedNavigationItems(navigationItems, user?.role)

    const isPathPresentInNavigation = (path: string, items: NavigationProps[]) => {
        if (isLoading) {
            return true
        }
        if (EXCLUDED_ROUTES.includes(path)) {
            return true
        }

        for (const item of items) {
            // Check if the current item's href matches the given path
            if (item.href === path) {
                return true
            }

            // If the item has children, recursively check them
            if (item.children && item.children.length > 0) {
                const foundInChildren = isPathPresentInNavigation(path, item.children)
                if (foundInChildren) {
                    return true
                }
            }
        }

        // Return false if the path was not found
        return false
    }

    // Usage
    const isPathValid = isPathPresentInNavigation(path, allowedNavigationItems)

    if (!isPathValid) {
        return <Navigate to='/401' replace />
    }

    return (
        <div>
            <Toaster />
            <Topbar />
            <MobileMenu />
            <Sidebar />
            <main className={cn('bg-zentive-gray-bg', !xl_vw_already ? 'lg:pl-72' : '')}>
                <div className='px-4 sm:px-6 lg:px-8'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default PrivateLayout
