import { Outlet } from 'react-router-dom'
import PublicHeader from './PublicHeader'
import { Toaster } from '@/components/Toaster'

const PublicLayout = () => {
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
