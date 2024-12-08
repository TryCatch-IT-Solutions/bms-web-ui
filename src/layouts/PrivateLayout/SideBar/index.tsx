import daiLogo from '@/assets/dai-logo.png'
import { atom } from 'jotai'
import { useState } from 'react'
import { HiOutlineUsers } from 'react-icons/hi'
import { HiOutlineHome } from 'react-icons/hi2'
import { HiOutlineClock } from 'react-icons/hi2'
import { HiDevicePhoneMobile } from 'react-icons/hi2'
import { HiUserGroup } from 'react-icons/hi2'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { MenuChildren } from './MenuChild/index'
import { IconType } from 'react-icons/lib/cjs/iconBase'
import { ROLE } from '@/constants'

export type NavigationProps = {
    name: string
    icon: IconType
    allowedRoles: (typeof ROLE)[keyof typeof ROLE][]
    href: string
    children?: NavigationChildrenProps[]
}

export type NavigationChildrenProps = {
    name: string
    href: string
    allowedRoles: string[]
}

export const navigationItems: NavigationProps[] = [
    {
        name: 'Dashboard',
        icon: HiOutlineHome,
        href: '/dashboard',
        allowedRoles: [ROLE.ADMIN, ROLE.USER],
    },
    {
        name: 'User Management',
        icon: HiOutlineUsers,
        href: '#',
        allowedRoles: [ROLE.ADMIN, ROLE.USER],
        children: [
            {
                name: 'Users',
                href: '#',
                allowedRoles: [ROLE.USER],
            },
            {
                name: 'Register',
                href: '#',
                allowedRoles: [ROLE.USER],
            },
        ],
    },
    {
        name: 'Group Management',
        icon: HiUserGroup,
        href: '#',
        allowedRoles: [ROLE.ADMIN, ROLE.USER],
        children: [
            {
                name: 'Groups',
                href: '#',
                allowedRoles: [ROLE.USER],
            },
        ],
    },
    {
        name: 'Device Management',
        icon: HiDevicePhoneMobile,
        href: '#',
        allowedRoles: [ROLE.ADMIN, ROLE.USER],
        children: [
            {
                name: 'Devices',
                href: '#',
                allowedRoles: [ROLE.USER],
            },
        ],
    },
    {
        name: 'Time Entries',
        icon: HiOutlineClock,
        href: '#',
        allowedRoles: [ROLE.ADMIN, ROLE.USER],
        children: [
            {
                name: 'Time Entries',
                href: '#',
                allowedRoles: [ROLE.USER],
            },
        ],
    },
]

export const navAtom = atom<boolean>(false)

export const Sidebar = () => {
    const [currentTab, setCurrentTab] = useState(0)
    const navigate = useNavigate()

    const xl_vw_already = useMediaQuery({ maxWidth: 1425 })

    return (
        <>
            {!xl_vw_already && (
                <div className='hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:shadow-lg lg:w-72 lg:shadow-gray-300'>
                    <div
                        className={
                            'flex grow flex-col gap-y-5 overflow-y-auto pb-4 border-gray-200 bg-white'
                        }
                    >
                        <div className='flex item-center justify-center mt-3'>
                            <button
                                onClick={() => {
                                    navigate('/dashboard')
                                    setCurrentTab(0)
                                }}
                            >
                                <img
                                    src={daiLogo}
                                    alt='Zentive Logo'
                                    className='h-[44px] w-[125px] cursor-pointer'
                                />
                            </button>
                        </div>
                        <nav
                            className='w-72 flex-auto space-y-2 bg-white overflow-auto no-scrollbar'
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
                </div>
            )}
        </>
    )
}
