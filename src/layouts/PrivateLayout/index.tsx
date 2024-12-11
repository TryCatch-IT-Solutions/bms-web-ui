import { Toaster } from '@/components/Toaster'
import { Outlet } from 'react-router-dom'
import { Topbar } from './TopBar'
import { Sidebar } from './SideBar'
import { cn } from '@/utils/helper'
import { LAPTOP_MAX_WIDTH } from '@/constants'
import { useMediaQuery } from 'react-responsive'
import { useAtomValue } from 'jotai'
import { tokenAtom } from '@/store/user'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

const PrivateLayout = () => {
    const xl_vw_already = useMediaQuery({ maxWidth: LAPTOP_MAX_WIDTH })
    const token = useAtomValue(tokenAtom)

    const { signOut } = useAuth()

    const getToken = () => {
        return !!token
    }

    const { data: isTokenValid, isLoading } = useQuery({
        queryKey: ['tokenKey', token],
        queryFn: getToken,
        enabled: !!token,
        refetchInterval: 10000,
        refetchIntervalInBackground: true,
    })

    useEffect(() => {
        if (!isTokenValid && !isLoading && isTokenValid !== undefined) {
            signOut() // Explicitly call the sign-out function
        }
    }, [isTokenValid]) // Trigger the effect when isTokenValid changes

    return (
        <div>
            <Toaster />
            <Topbar />
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
