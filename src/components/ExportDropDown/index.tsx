/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { paginationAtom } from '@/store/paginationAtom'
import { useSetAtom } from 'jotai'
import { twMerge } from 'tailwind-merge'
import { NavigationProps } from '@/types/NavProps'
import { path } from '@/utils/path'

type IMenu = {
    index: number
    item: NavigationProps
    isOpen: boolean
    setCurrentTab: React.Dispatch<React.SetStateAction<number>>
}

export const MenuChildren = (props: IMenu) => {
    const { pathname } = useLocation()

    return (
        <Disclosure as='div' className='space-y-1' defaultOpen={props.isOpen}>
            {() => (
                <>
                    <Items
                        index={props.index}
                        open={props.isOpen}
                        item={props.item}
                        setCurrentTab={props.setCurrentTab}
                    />
                    {props.item.children && props.isOpen && (
                        <Transition
                            show={path(props.item, pathname) || props.isOpen}
                            appear={true}
                            enter='transition-all duration-300 ease-in-out'
                            enterFrom='-translate-y-4 opacity-0'
                            enterTo='translate-y-0 opacity-100'
                            leave='transition-all duration-300 ease-out'
                            leaveFrom='translate-y-0 opacity-100'
                            leaveTo='-translate-y-4 opacity-0'
                        >
                            <SubItems
                                index={props.index}
                                open={props.isOpen}
                                item={props.item}
                                setCurrentTab={props.setCurrentTab}
                            />
                        </Transition>
                    )}
                </>
            )}
        </Disclosure>
    )
}

type ItemProps = {
    index: number
    open: boolean
    item: NavigationProps
    setCurrentTab: React.Dispatch<React.SetStateAction<number>>
}

const Items = (props: ItemProps) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const setPage = useSetAtom(paginationAtom)

    return (
        <Disclosure.Button
            className={twMerge(
                !props.item.children && props.item.href === pathname ? 'bg-zentive-green-dark' : '',
                'text-zentive-gray-dark hover:bg-zentive-green-medium pl-7 group w-full flex items-center pr-5 py-2 text-left text-sm font-medium focus:outline-primary',
                props.item.children &&
                    (props.open || path(props.item, pathname)) &&
                    'bg-zentive-green-dark hover:bg-zentive-green-medium',
                props.item.href !== pathname
                    ? 'hover:border-l-4 hover:border-zentive-green-dark hover:bg-gray-200'
                    : '',
            )}
            onClick={() => {
                if (!props.item.children) {
                    navigate(props.item.href)
                    if (props.item.name === 'Order') {
                        setPage(0)
                    }
                }
                if (props.open) {
                    return props.setCurrentTab(0)
                }
                props.setCurrentTab(props.index)
            }}
        >
            <span
                aria-hidden='true'
                className={twMerge(
                    // 'flex-1',
                    // (props.open || path(props.item)) && 'text-gray-700  hover:text-primary',
                    'bg-white mr-3 h-6 w-6 text-green-200', // to check by Kyle
                )}
            >
                <props.item.icon
                    className='mr-3 flex-shrink-0 h-6 w-6 group-hover:text-primary'
                    aria-hidden='true'
                />
            </span>

            <span
                className={twMerge(
                    'flex-1',
                    (props.open || path(props.item, pathname)) && 'text-white  hover:text-primary',
                )}
            >
                {props.item.name}
            </span>

            {props.item.children && (props.open || path(props.item, pathname)) && props.open ? (
                <HiChevronUp className='text-gray-900 ml-3 flex-shrink-0 h-4 w-4 group-hover:text-primary transition-colors ease-in-out duration-150' />
            ) : (
                props.item.children && (
                    <HiChevronDown className='text-gray-900 ml-3 flex-shrink-0 h-4 w-4 group-hover:text-primary transition-colors ease-in-out duration-150' />
                )
            )}
        </Disclosure.Button>
    )
}

const SubItems = (props: ItemProps) => {
    if (!props.item.children) {
        return null
    }

    return (
        <Disclosure.Panel className='space-y-1'>
            {props.item.children?.map((subItem) => (
                <NavLink
                    key={subItem.name}
                    to={subItem.href}
                    className={({ isActive }) =>
                        twMerge(
                            'bg-white text-gray-500 hover:bg-gray-200 transition-all duration-300 group w-full flex items-center pl-16 py-2 text-sm font-medium',
                            isActive && 'bg-red-50 text-gray-700',
                        )
                    }
                    onClick={() => {
                        // dispatch(toggleSidebar({sidebarExpand: false, openPanel: item.name}))
                    }}
                >
                    {subItem.name}
                </NavLink>
            ))}
        </Disclosure.Panel>
    )
}
