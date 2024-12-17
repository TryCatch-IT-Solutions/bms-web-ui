/* eslint-disable @typescript-eslint/no-unused-vars */
import { Disclosure, Transition } from '@headlessui/react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { Dispatch, SetStateAction } from 'react'
import { NavigationProps } from '..'
import { path } from '@/utils/path'

type ItemProps = {
    index: number
    open: boolean
    item: NavigationProps
    setCurrentTab: Dispatch<SetStateAction<number>>
}

type IMenu = {
    index: number
    item: NavigationProps
    isOpen: boolean
    setCurrentTab: Dispatch<SetStateAction<number>>
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
                    {props?.item?.children && props.isOpen && (
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

const Items = ({ index, item, open, setCurrentTab }: ItemProps) => {
    const { pathname } = useLocation()

    const navigate = useNavigate()

    const isSamePathname = item.href === pathname

    // if navigation item has children AND close AND path(item, pathname)
    const navItemHoverStyle =
        isSamePathname || path(item, pathname)
            ? 'group-hover:text-bms-link whitespace-nowrap'
            : 'group-hover:text-zentive-green-dark whitespace-nowrap'

    const navItemTextStyle =
        ((path(item, pathname) && !open) || (open && path(item, pathname)) || isSamePathname) &&
        'text-bms-link'

    return (
        <Disclosure.Button
            className={twMerge(
                // default navigation item style
                'hover:zentive-green-medium pl-7 group w-full flex items-center pr-5 py-2 text-left focus:outline-primary',
                // If navigation item has no child routes AND matches the current path
                // OR
                /// If navigation item has child routes AND the navigation item and matches the pathname
                ((item.children && path(item, pathname)) || (!item.children && isSamePathname)) &&
                    'bg-zentive-green-dark',
                // If navigation item has child routes AND the navigation item is open but does not match the pathname
                item.children && open && !path(item, pathname) && 'bg-gray-200',
                // if navigation item href does not match the pathname AND pathname does not exist on child route
                !isSamePathname &&
                    !path(item, pathname) &&
                    'hover:border-l-4 hover:border-zentive-green-dark hover:bg-gray-200',
            )}
            onClick={() => {
                if (!item.children) {
                    navigate(item.href)
                }
                if (open) {
                    return setCurrentTab(0)
                }
                setCurrentTab(index)
            }}
        >
            <span
                aria-hidden='true'
                className={twMerge(
                    'mr-3 h-6 w-6 text-zentive-blue-dark',
                    navItemHoverStyle,
                    navItemTextStyle,
                )}
            >
                <item.icon className='mr-3 flex-shrink-0 h-6 w-6' aria-hidden='true' />
            </span>

            <span className={twMerge('flex-1', navItemHoverStyle, navItemTextStyle)}>
                {item.name}
            </span>

            {item.children && (open || path(item, pathname)) && open ? (
                <HiChevronUp className='text-gray-900 ml-3 flex-shrink-0 h-4 w-4 group-hover:text-primary transition-colors ease-in-out duration-150' />
            ) : (
                item.children && (
                    <HiChevronDown className='text-gray-900 ml-3 flex-shrink-0 h-4 w-4 group-hover:text-primary transition-colors ease-in-out duration-150' />
                )
            )}
        </Disclosure.Button>
    )
}

const SubItems = ({ item }: ItemProps) => {
    const { pathname } = useLocation()
    if (!item.children) {
        return null
    }

    return (
        <Disclosure.Panel className='space-y-1'>
            {item.children?.map((subItem) => (
                <NavLink
                    key={subItem.name}
                    to={subItem.href}
                    className={twMerge(
                        'bg-transparent text-gray-500 hover:bg-gray-200 transition-all duration-300 group w-full flex items-center pl-16 py-2 text-sm font-medium',
                        subItem.href === pathname && 'bg-zentive-gray-light text-zentive-blue-dark',
                    )}
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
