import { Outlet, useNavigate } from 'react-router-dom'
import PublicHeader from './PublicHeader'
import { Toaster } from '@/components/Toaster'
import { useAtomValue } from 'jotai'
import { tokenAtom } from '@/store/user'
import { useQuery } from '@tanstack/react-query'
import { verifyToken } from '@/api/auth'
import { useEffect } from 'react'

const PublicLayout = () => {
    const token = useAtomValue(tokenAtom)
    const navigate = useNavigate()
    const path = location.pathname

    const { data: isTokenValid, isLoading } = useQuery({
        queryKey: ['tokenKey', token],
        queryFn: verifyToken,
        enabled: !!token,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    })

    useEffect(() => {
        if (isTokenValid && !isLoading && token !== null && isTokenValid !== undefined) {
            navigate('/dashboard')
        }
    }, [isTokenValid, isLoading, path]) // Trigger the effect when isTokenValid changes

    return (
        <div className='flex flex-col h-screen'>
            <main className='flex-1 bg-bms-gray-200 items-center justify-center'>
                <Toaster />
                <PublicHeader />
                <Outlet />
            </main>
        </div>
    )
}

export default PublicLayout
