import { ROLE } from '@/constants'
import { NavigationProps } from '@/types/NavProps'

const RESTRICTED_TABS = ['Invoices', 'Refunds', 'Payments']
const RESTRICTED_PAGES = [
    'Invoicing',
    'Gross and Net Income',
    'Job Completion',
    'Jobs Completed By Employee',
    'Invoices',
    'Expenses',
    'Revenue',
]

export const getAllowedNavigationItems = (
    navigationItems: NavigationProps[],
    isConnectedToStripe: boolean = false,
    roleName: string = '',
): NavigationProps[] => {
    const filteredNavigationItems = navigationItems
        ?.map((item) => {
            if (
                item.allowedRoles.includes(roleName) &&
                isConnectedToStripe === false &&
                RESTRICTED_TABS.includes(item.name)
            ) {
                return null
            }

            const filteredChildren = item.children?.filter((child) => {
                if (
                    !isConnectedToStripe &&
                    RESTRICTED_PAGES.includes(child.name) &&
                    roleName !== ROLE.ADMIN
                ) {
                    return null
                }

                return child.allowedRoles.includes(roleName)
            })

            const isParentAllowed =
                item.allowedRoles.includes(roleName) &&
                !(isConnectedToStripe === false && RESTRICTED_TABS.includes(item.name))

            if (isParentAllowed || (filteredChildren && filteredChildren?.length > 0)) {
                return {
                    ...item,
                    children: filteredChildren,
                }
            }

            return null
        })
        .filter((item) => item !== null) as NavigationProps[]

    return filteredNavigationItems
}
