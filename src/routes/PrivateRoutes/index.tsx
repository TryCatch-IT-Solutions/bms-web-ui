import PrivateLayout from '@/layouts/PrivateLayout'
import { GroupList } from '@/pages/private/Groups/GroupList'
import { CreateUser } from '@/pages/private/Users/CreateUser'
import { EditUser } from '@/pages/private/Users/EditUser'
import { UserList } from '@/pages/private/Users/UserList'
import { RouteObject } from 'react-router-dom'

// TO DO: append child paths to /dashboard for the sidebar navigation.
// e.g. /dashboard/customers, /schedule, /finance-managmement, etc..

const PrivateRoutes: RouteObject = {
    path: '/',
    element: <PrivateLayout />,
    children: [
        {
            path: '/dashboard',
            element: <></>,
        },
        {
            path: '/user',
            children: [
                {
                    path: 'list',
                    element: <UserList />,
                },
                {
                    path: 'register',
                    element: <CreateUser />,
                },
                {
                    path: 'edit',
                    element: <EditUser />,
                },
            ],
        },
        {
            path: '/group',
            children: [
                {
                    path: 'list',
                    element: <GroupList />,
                },
            ],
        },
    ],
}

export default PrivateRoutes
