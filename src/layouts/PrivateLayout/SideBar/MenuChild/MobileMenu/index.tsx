import { Dialog, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import { Fragment, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { MenuChildren } from '..'
import { navAtom, navigationItems } from '../..'
import zentiveLogo from '@/assets/common/Zentive_Horizontal_Logo@3x.png'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { cn } from '@/utils/helper'

const MobileMenu = () => {
    const [sidebarOpen, setSidebarOpen] = useAtom(navAtom)
    const [currentTab, setCurrentTab] = useState(0)
    const navigate = useNavigate()

    const xl_vw_already = useMediaQuery({ maxWidth: 1425 })

    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className={cn('relative z-50', !xl_vw_already && 'hidden')}
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='transition-opacity ease-linear duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity ease-linear duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-gray-900/80' />
                    </Transition.Child>

                    <div className='fixed inset-0 flex'>
                        <Transition.Child
                            as={Fragment}
                            enter='transition ease-in-out duration-300 transform'
                            enterFrom='-translate-x-full'
                            enterTo='translate-x-0'
                            leave='transition ease-in-out duration-300 transform'
                            leaveFrom='translate-x-0'
                            leaveTo='-translate-x-full'
                        >
                            <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                                <Transition.Child
                                    as={Fragment}
                                    enter='ease-in-out duration-300'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-100'
                                    leave='ease-in-out duration-300'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                >
                                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                                        <button
                                            type='button'
                                            className='-m-2.5 p-2.5'
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className='sr-only'>Close sidebar</span>
                                            <HiXMark
                                                className='h-8 w-8 text-white border border-white rounded-md'
                                                aria-hidden='true'
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div
                                    className={
                                        'flex grow flex-col gap-y-5 overflow-y-auto px-3 pb-4 border-gray-200 bg-white'
                                    }
                                >
                                    <div className='flex item-center justify-center mt-3'>
                                        {/* <img src={Logo} /> */}
                                        <img
                                            onClick={() => {
                                                navigate('/dashboard')
                                                setCurrentTab(0)
                                            }}
                                            src={zentiveLogo}
                                            alt='Zentive Logo'
                                            className='h-[44px] w-[125px]'
                                        />
                                    </div>
                                    <nav
                                        className='flex-auto pt-4 space-y-2 bg-white overflow-auto no-scrollbar'
                                        aria-label='Sidebar'
                                    >
                                        {navigationItems?.map((item, index) => (
                                            <div key={`${item?.name}-${index}`}>
                                                <MenuChildren
                                                    index={index}
                                                    isOpen={index === currentTab}
                                                    item={item}
                                                    setCurrentTab={setCurrentTab}
                                                />
                                            </div>
                                        ))}
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
export default MobileMenu
