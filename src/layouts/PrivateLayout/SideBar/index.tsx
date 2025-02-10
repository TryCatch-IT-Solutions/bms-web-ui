import { atom, useAtomValue } from 'jotai'
import { useState } from 'react'
import { HiOutlineDocument, HiOutlineUsers } from 'react-icons/hi'
import { HiOutlineBellAlert, HiOutlineHome, HiOutlineUserGroup } from 'react-icons/hi2'
import { HiOutlineClock } from 'react-icons/hi2'
import { HiDevicePhoneMobile } from 'react-icons/hi2'
import { HiUserGroup } from 'react-icons/hi2'
import { useMediaQuery } from 'react-responsive'
import { MenuChildren } from './MenuChild/index'
import { IconType } from 'react-icons/lib/cjs/iconBase'
import { ROLE } from '@/constants'
import { userAtom } from '@/store/user'
import { getAllowedNavigationItems } from '@/utils/navigation'

export type NavigationProps = {
    name: string
    icon?: IconType
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
        allowedRoles: [ROLE.superadmin],
        children: [
            {
                name: 'Users',
                href: '/user/list',
                allowedRoles: [ROLE.superadmin],
            },
            {
                name: 'Register',
                href: '/user/register',
                allowedRoles: [ROLE.superadmin],
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
                allowedRoles: [ROLE.superadmin],
            },
            {
                name: 'Create Group',
                href: '/group/create',
                allowedRoles: [ROLE.superadmin],
            },
            {
                name: 'My Group',
                href: '/group/user-group',
                allowedRoles: [ROLE.groupadmin],
            },
        ],
    },
    {
        name: 'Devices',
        icon: HiDevicePhoneMobile,
        href: '#',
        allowedRoles: [ROLE.superadmin],
        children: [
            {
                name: 'Devices',
                href: '/device/list',
                allowedRoles: [ROLE.superadmin],
            },
            {
                name: 'Add Device',
                href: '/device/create',
                allowedRoles: [ROLE.superadmin],
            },
            {
                name: 'Map View',
                href: '/device/map-view',
                allowedRoles: [ROLE.superadmin],
            },
        ],
    },
    {
        name: 'Employees',
        icon: HiOutlineUserGroup,
        href: '#',
        allowedRoles: [ROLE.superadmin, ROLE.groupadmin],
        children: [
            {
                name: 'Create Employee',
                href: '/employee/create',
                allowedRoles: [ROLE.groupadmin, ROLE.superadmin],
            },
            {
                name: 'Employee List',
                href: '/employee/list',
                allowedRoles: [ROLE.superadmin],
            },
        ],
    },
    {
        name: 'Announcements',
        icon: HiOutlineBellAlert,
        href: '#',
        allowedRoles: [ROLE.superadmin, ROLE.groupadmin],
        children: [
            {
                name: 'Create Announcement',
                href: '/notification/create',
                allowedRoles: [ROLE.superadmin],
            },
            {
                name: 'Announcements List',
                href: '/notification/list',
                allowedRoles: [ROLE.superadmin],
            },
        ],
    },
    {
        name: 'Time Entries',
        icon: HiOutlineClock,
        href: '#',
        allowedRoles: [ROLE.superadmin, ROLE.groupadmin],
        children: [
            {
                name: 'Employee Time Entries',
                href: '/employee/time-entries',
                allowedRoles: [ROLE.groupadmin, ROLE.superadmin],
            },
        ],
    },
    {
        name: 'Logs',
        icon: HiOutlineDocument,
        href: '#',
        allowedRoles: [ROLE.superadmin],
        children: [
            {
                name: 'Activity Logs',
                href: '/log/activity',
                allowedRoles: [ROLE.superadmin],
            },
        ],
    },
]

export const navAtom = atom<boolean>(false)

export const Sidebar = () => {
    const user = useAtomValue(userAtom)
    const [currentTab, setCurrentTab] = useState(0)
    const xl_vw_already = useMediaQuery({ maxWidth: 1425 })
    const allowedNavigationItems = getAllowedNavigationItems(navigationItems, user?.role)

    return (
        <>
            {!xl_vw_already && (
                <div className='lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:shadow-lg lg:w-72 lg:shadow-gray-300'>
                    <nav
                        className='w-72 flex-auto space-y-2 bg-white overflow-auto no-scrollbar mt-20'
                        aria-label='Sidebar'
                    >
                        {allowedNavigationItems?.map((item, index) => (
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
