import { Toaster } from '@/components/Toaster'
import { Outlet } from 'react-router-dom'
import { Topbar } from './TopBar'
import { Sidebar } from './SideBar'

const PrivateLayout = () => {
    return (
        <div>
            <Toaster />
            <Topbar />
            <Sidebar />
            <main className='py-10'>
                <div className='px-4 sm:px-6 lg:px-8'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default PrivateLayout
