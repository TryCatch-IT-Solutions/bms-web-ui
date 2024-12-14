import { Toaster } from '@/components/Toaster'
import { Outlet } from 'react-router-dom'
import { Topbar } from './TopBar'
import { Sidebar } from './SideBar'
import { cn } from '@/utils/helper'
import { LAPTOP_MAX_WIDTH } from '@/constants'
import { useMediaQuery } from 'react-responsive'
import { useAtomValue } from 'jotai'
import { tokenAtom } from '@/store/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { verifyToken } from '@/api/auth'

const PrivateLayout = () => {
    const xl_vw_already = useMediaQuery({ maxWidth: LAPTOP_MAX_WIDTH })
    const token = useAtomValue(tokenAtom)

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
