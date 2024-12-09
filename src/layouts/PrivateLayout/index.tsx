import { Toaster } from '@/components/Toaster'
import { Outlet } from 'react-router-dom'
import { Topbar } from './TopBar'
import { Sidebar } from './SideBar'
import { cn } from '@/utils/helper'
import { LAPTOP_MAX_WIDTH } from '@/constants'
import { useMediaQuery } from 'react-responsive'

const PrivateLayout = () => {
    const xl_vw_already = useMediaQuery({ maxWidth: LAPTOP_MAX_WIDTH })
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
