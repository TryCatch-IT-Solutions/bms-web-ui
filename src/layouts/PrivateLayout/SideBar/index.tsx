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
        allowedRoles: [ROLE.superadmin, ROLE.groupadmin],
    },
    {
        name: 'Users',
        icon: HiOutlineUsers,
        href: '#',
        allowedRoles: [ROLE.superadmin, ROLE.groupadmin],
        children: [
            {
                name: 'Users',
                href: '/user/list',
                allowedRoles: [ROLE.groupadmin],
            },
            {
                name: 'Register',
                href: '/user/register',
                allowedRoles: [ROLE.groupadmin],
            },
        ],
    },
    {
        name: 'Groups',
        icon: HiUserGroup,
        href: '#',
        allowedRoles: [ROLE.superadmin, ROLE.groupadmin],
        children: [
            {
                name: 'Groups',
                href: '/group/list',
                allowedRoles: [ROLE.groupadmin],
            },
            {
                name: 'Create Group',
                href: '/group/create',
                allowedRoles: [ROLE.groupadmin],
            },
        ],
    },
    {
        name: 'Device',
        icon: HiDevicePhoneMobile,
        href: '#',
        allowedRoles: [ROLE.superadmin, ROLE.groupadmin],
        children: [
            {
                name: 'Devices',
                href: '#',
                allowedRoles: [ROLE.groupadmin],
            },
            {
                name: 'Add Device',
                href: '#',
                allowedRoles: [ROLE.groupadmin],
            },
        ],
    },
    {
        name: 'Employees',
        icon: HiOutlineClock,
        href: '#',
        allowedRoles: [ROLE.superadmin, ROLE.groupadmin],
        children: [
            {
                name: 'Create Employee',
                href: '/employee/create',
                allowedRoles: [ROLE.groupadmin],
            },
            {
                name: 'Employee List',
                href: '/employee/list',
                allowedRoles: [ROLE.groupadmin],
            },
            {
                name: 'Time Entries',
                href: '/employee/time-entry',
                allowedRoles: [ROLE.groupadmin],
            },
        ],
    },
    {
        name: 'Logs',
        icon: HiOutlineClock,
        href: '#',
        allowedRoles: [ROLE.superadmin, ROLE.groupadmin],
        children: [
            {
                name: 'Employee List',
                href: '#',
                allowedRoles: [ROLE.groupadmin],
            },
            {
                name: 'Create Employee',
                href: '#',
                allowedRoles: [ROLE.groupadmin],
            },
            {
                name: 'Time Entries',
                href: '#',
                allowedRoles: [ROLE.groupadmin],
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
