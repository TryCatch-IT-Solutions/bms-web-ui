import { ROLE } from '@/constants'
import { NavigationProps } from '@/types/NavProps'

export const path = (item: NavigationProps, pathname: string) => {
    if (item.children) {
        return item.children.find((o) => o.href === pathname) ? true : false
    }
    return
}

export const getDashboardPath = (roleName: string) => {
    switch (roleName) {
        case ROLE.CUSTOMER:
            return '/customer-portal/dashboard'
        case ROLE.CREW:
            return '/crew/jobs'
        case ROLE.OWNER:
        default:
            return '/dashboard'
    }
}
