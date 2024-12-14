import { ROLE } from '@/constants'
import { NavigationProps } from '@/layouts/PrivateLayout/SideBar'

const RESTRICTED_TABS = ['Dashboard', 'Devices', 'Users']
const RESTRICTED_PAGES = ['Dashboard', 'Users', 'Register', 'Devices', 'Add Device']

export const getAllowedNavigationItems = (
    navigationItems: NavigationProps[],
    roleName: string = '',
): NavigationProps[] => {
    const filteredNavigationItems = navigationItems
        ?.map((item) => {
            if (item.allowedRoles.includes(roleName) && RESTRICTED_TABS.includes(item.name)) {
                return null
            }

            const filteredChildren = item.children?.filter((child) => {
                if (RESTRICTED_PAGES.includes(child.name) && roleName !== ROLE.superadmin) {
                    return null
                }

                return child.allowedRoles.includes(roleName)
            })

            const isParentAllowed =
                item.allowedRoles.includes(roleName) && RESTRICTED_TABS.includes(item.name)

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
