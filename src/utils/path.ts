import { NavigationProps } from '@/layouts/PrivateLayout/SideBar'

export const path = (item: NavigationProps, pathname: string) => {
    if (item.children) {
        return item.children.find((o: any) => o.href === pathname) ? true : false
    }
    return
}
