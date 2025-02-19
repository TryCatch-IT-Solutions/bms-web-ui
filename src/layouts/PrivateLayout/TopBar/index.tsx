import { Popover, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import { BsPerson } from 'react-icons/bs'
import { CiSettings, CiUser } from 'react-icons/ci'
import { FaBars } from 'react-icons/fa'
import { FiChevronDown, FiLogOut } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
// import Notifications from './Notifications'

import { useLocation, useNavigate } from 'react-router-dom'

import daiLogo from '@/assets/dai-logo.png'
import { useAuth } from '@/hooks/useAuth'
import { useAtom, useAtomValue } from 'jotai'
import { userAtom } from '@/store/user'
import { navAtom } from '../SideBar'
import { API_KEY_LABELS, ROLE_VALUES } from '@/constants'
import { getAPIKey } from '@/api/settings'
import { useQuery } from '@tanstack/react-query'
import Spinner from '@/components/Spinner'
import { LOGO_URL } from '@/api/axiosInstance'

export const Topbar = () => {
    const navigate = useNavigate()
    const user = useAtomValue(userAtom)
    const [sidebarOpen, setSidebarOpen] = useAtom(navAtom)
    const { pathname } = useLocation()

    const { signOut, isPending } = useAuth()

    const xl_vw_already = useMediaQuery({ maxWidth: 1425 })

    const { data: logo, isLoading } = useQuery({
        queryKey: ['topBarLogo'],
        queryFn: () => getAPIKey(API_KEY_LABELS.PRIMARY_LOGO, 0),
    })

    return (
        <div className='sticky text-zentive-gray-semi-medium top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
            {xl_vw_already && pathname !== '/customer-portal/create-password' && (
                <button
                    type='button'
                    disabled={isPending}
                    className='-m-2.5 p-2.5 text-gray-700 flex'
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <span className='sr-only'>Open sidebar</span>
                    <FaBars className='w-6 h-6' />
                </button>
            )}

            <div
                className={`flex flex-1 gap-x-4 lg:gap-x-6 justify-between xs:justify-end sm:justify-end`}
            >
                <div className='flex item-center justify-center xs:hidden sm:hidden'>
                    <button
                        onClick={() => {
                            navigate('/dashboard')
                        }}
                    >
                        {isLoading ? (
                            <Spinner variant='normal' className='h-5 w-5' />
                        ) : (
                            <img
                                src={logo?.value ? LOGO_URL + logo?.value : daiLogo}
                                alt='BMS Logo'
                                className='h-14 w-54 cursor-pointer'
                            />
                        )}
                    </button>
                </div>

                <div className='flex items-center gap-x-2 lg:gap-x-4'>
                    {/* to be refactored by interns */}
                    <Popover as='div' className='my-3 mx-3'>
                        <Popover.Button className='max-w-xs flex items-center text-sm focus:outline-none'>
                            <BsPerson className='mr-3 w-6 h-6' />
                            <div className='inline-flex gap-2 justify-center items-center pl-5 xs:pl-0 sm:pl-0'>
                                <div>
                                    <p className='font-semibold xs:text-sm sm:text-sm'>
                                        {user?.first_name} {user?.last_name}
                                    </p>
                                    <p className='mt-1 text-bms-primary/70 text-xs xs:text-xxs sm:text-xxs capitalize'>
                                        {
                                            ROLE_VALUES.find((role) => role.value === user?.role)
                                                ?.label
                                        }
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
                                        disabled={isPending}
                                        className='border-b-2 border-zentive-gray-bg'
                                        onClick={() => navigate('/user/my-profile')}
                                    >
                                        <div className='p-3 flex items-center cursor-pointer text-sm hover:bg-zentive-gray-bg hover:text-black hover:font-semibold transition-all'>
                                            <CiUser className='mr-3 w-6 h-6' />
                                            <div className='flex-1 text-left'>
                                                <p> My Profile </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        type='button'
                                        disabled={isPending}
                                        className='border-b-2 border-zentive-gray-bg'
                                        onClick={() => navigate('/settings/api-keys')}
                                    >
                                        <div className='p-3 flex items-center cursor-pointer text-sm hover:bg-zentive-gray-bg hover:text-black hover:font-semibold transition-all'>
                                            <CiSettings className='mr-3 w-6 h-6' />
                                            <div className='flex-1 text-left'>
                                                <p> Settings </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => signOut()}
                                        type='button'
                                        disabled={isPending}
                                    >
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
