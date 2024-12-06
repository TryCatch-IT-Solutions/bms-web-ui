
import { useMediaQuery } from 'react-responsive'
import { Outlet } from 'react-router-dom'
import { cn } from '@/utils/helper'


const PrivateLayout = () => {

        const xl_vw_already = useMediaQuery({ maxWidth: 1425 })
    
    return (
        <>
            {/* <Toaster /> */}
            {/* {isNotPasswordGenerated && <MobileMenu />}
            {!isCrewRole && isNotPasswordGenerated ? ( */}
                <div>
                    {/* {shouldShowSidebarCondition ? <Sidebar /> : <></>} */}

                    <div
                        className={cn(
                            'min-h-screen bg-zentive-gray-bg',
                            (!xl_vw_already ? 'lg:pl-72' : ''))}
                    >
                        {/* <Topbar /> */}
                        <main className='py-10'>
                            <div className='px-4 sm:px-6 lg:px-8'>
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
        </>
    )
}

export default PrivateLayout
