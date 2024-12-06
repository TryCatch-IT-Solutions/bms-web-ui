import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
// import PublicHeader from './PublicHeader'
// import PublicFooter from './PublickFooter'
// import { Toaster } from '@/components/Toaster'

const PublicLayout = () => {
    const { pathname } = useLocation()

    return (
        <div className='flex flex-col h-screen'>
            {/* <Toaster /> */}
            <main className='flex-1 flex items-center justify-center'>
                <div className='flex justify-center h-full w-full overflow-x-hidden'>
                    <div className='w-full max-w-[1024px] public-bg border border-y-0 border-x-gray-200 bg-white'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PublicLayout
