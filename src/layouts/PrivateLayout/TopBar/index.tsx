import { Popover, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import { BsPerson } from 'react-icons/bs'
import { CiSettings } from 'react-icons/ci'
import { FaBars } from 'react-icons/fa'
import { FiChevronDown, FiLogOut } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
// import Notifications from './Notifications'

import { useLocation, useNavigate } from 'react-router-dom'

import daiLogo from '@/assets/dai-logo.png'
import { useAuth } from '@/hooks/useAuth'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/store/user'

export const Topbar = () => {
    const navigate = useNavigate()
    const user = useAtomValue(userAtom)

    const { pathname } = useLocation()

    const { signOut } = useAuth()

    const xl_vw_already = useMediaQuery({ maxWidth: 1425 })

    return (
        <div className='sticky text-zentive-gray-semi-medium top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
            {xl_vw_already && pathname !== '/customer-portal/create-password' && (
                <button type='button' className='-m-2.5 p-2.5 text-gray-700 flex'>
                    <span className='sr-only'>Open sidebar</span>
                    <FaBars className='w-6 h-6' />
                </button>
            )}

            <div className={`flex flex-1 gap-x-4 lg:gap-x-6 justify-between`}>
                <div className='flex item-center justify-center'>
                    <button
                        onClick={() => {
                            navigate('/dashboard')
                        }}
                    >
                        <img src={daiLogo} alt='BMS Logo' className='h-14 w-54 cursor-pointer' />
                    </button>
                </div>

                <div className='flex items-center gap-x-2 lg:gap-x-4'>
                    {/* to be refactored by interns */}
                    <Popover as='div' className='my-3 mx-3'>
                        <Popover.Button className='max-w-xs flex items-center text-sm focus:outline-none'>
                            <BsPerson className='mr-3 w-6 h-6' />
                            <div className='inline-flex gap-2 justify-center items-center pl-5'>
                                <div>
                                    <p className='font-semibold'>
                                        {user?.first_name} {user?.last_name}
                                    </p>
                                    <p className='mt-1 text-[#80A91D] text-xs capitalize'>
                                        {user?.role}
                                    </p>
                                </div>

                                <FiChevronDown className='w-5 h-5' />
                            </div>
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                        >
                            <Popover.Panel className='z-40 origin-top-right absolute right-4 top-16 w-[227px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                <div className='flex font-[400] flex-col'>
                                    <button
                                        type='button'
                                        className='border-b-2 border-zentive-gray-bg'
                                    >
                                        <div className='p-3 flex items-center cursor-pointer text-sm hover:bg-zentive-gray-bg hover:text-black hover:font-semibold transition-all'>
                                            <CiSettings className='mr-3 w-6 h-6' />
                                            <div className='flex-1 text-left'>
                                                <p> Settings </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button onClick={() => signOut()} type='button'>
                                        <div className='p-3 flex items-center cursor-pointer text-sm rounded-b-md bg-zentive-gray-bg hover:bg-gray-300 hover:text-black hover:font-semibold transition-all'>
                                            <FiLogOut className='mr-3 w-5 h-5 text-zentive-red-dark' />
                                            <p className='flex-1 text-left'> Logout </p>
                                        </div>
                                    </button>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </div>
            </div>
        </div>
    )
}
