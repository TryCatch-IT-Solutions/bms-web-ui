import { atom } from 'jotai'
import { useState } from 'react'
import { HiOutlineUsers } from 'react-icons/hi'
import { HiOutlineHome } from 'react-icons/hi2'
import { HiOutlineClock } from 'react-icons/hi2'
import { HiDevicePhoneMobile } from 'react-icons/hi2'
import { HiUserGroup } from 'react-icons/hi2'
import { useMediaQuery } from 'react-responsive'
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
        allowedRoles: [ROLE.ADMIN, ROLE.GROUP_ADMIN],
    },
    {
        name: 'Users',
        icon: HiOutlineUsers,
        href: '#',
        allowedRoles: [ROLE.ADMIN, ROLE.GROUP_ADMIN],
        children: [
            {
                name: 'Users',
                href: '/user/list',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
            {
                name: 'Register',
                href: '/user/register',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
        ],
    },
    {
        name: 'Groups',
        icon: HiUserGroup,
        href: '#',
        allowedRoles: [ROLE.ADMIN, ROLE.GROUP_ADMIN],
        children: [
            {
                name: 'Groups',
                href: '/group/list',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
            {
                name: 'Create Group',
                href: '/group/create',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
        ],
    },
    {
        name: 'Device',
        icon: HiDevicePhoneMobile,
        href: '#',
        allowedRoles: [ROLE.ADMIN, ROLE.GROUP_ADMIN],
        children: [
            {
                name: 'Devices',
                href: '#',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
            {
                name: 'Add Device',
                href: '#',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
        ],
    },
    {
        name: 'Employees',
        icon: HiOutlineClock,
        href: '#',
        allowedRoles: [ROLE.ADMIN, ROLE.GROUP_ADMIN],
        children: [
            {
                name: 'Employee List',
                href: '#',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
            {
                name: 'Time Entries',
                href: '#',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
        ],
    },
    {
        name: 'Logs',
        icon: HiOutlineClock,
        href: '#',
        allowedRoles: [ROLE.ADMIN, ROLE.GROUP_ADMIN],
        children: [
            {
                name: 'Employee List',
                href: '#',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
            {
                name: 'Create Employee',
                href: '#',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
            {
                name: 'Time Entries',
                href: '#',
                allowedRoles: [ROLE.GROUP_ADMIN],
            },
        ],
    },
]

export const navAtom = atom<boolean>(false)

export const Sidebar = () => {
    const [currentTab, setCurrentTab] = useState(0)

    const xl_vw_already = useMediaQuery({ maxWidth: 1425 })

    return (
        <>
            {!xl_vw_already && (
                <div className='lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:shadow-lg lg:w-72 lg:shadow-gray-300'>
                    <nav
                        className='w-72 flex-auto space-y-2 bg-white overflow-auto no-scrollbar mt-20'
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
            )}
        </>
    )
}
