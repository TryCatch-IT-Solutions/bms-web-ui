import PrivateLayout from '@/layouts/PrivateLayout'
import { CreateDevice } from '@/pages/private/Devices/CreateDevice'
import { DeviceList } from '@/pages/private/Devices/DeviceList'
import { CreateEmployee } from '@/pages/private/Employees/CreateEmployee'
import { EditEmployee } from '@/pages/private/Employees/EditEmployee'
import { EmployeeList } from '@/pages/private/Employees/EmployeeList'
import { CreateGroup } from '@/pages/private/Groups/CreateGroup'
import { EditGroup } from '@/pages/private/Groups/EditGroup'
import { GroupList } from '@/pages/private/Groups/GroupList'
import { CreateUser } from '@/pages/private/Users/CreateUser'
import { EditUser } from '@/pages/private/Users/EditUser'
import { UserList } from '@/pages/private/Users/UserList'
import { path } from '@/utils/path'
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
                    path: 'edit/:id',
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
                {
                    path: 'create',
                    element: <CreateGroup />,
                },
                {
                    path: 'edit',
                    element: <EditGroup />,
                },
            ],
        },
        {
            path: '/employee',
            children: [
                {
                    path: 'list',
                    element: <EmployeeList />,
                },
                {
                    path: 'create',
                    element: <CreateEmployee />,
                },
                {
                    path: 'edit',
                    element: <EditEmployee />,
                },
            ],
        },
        {
            path: '/device',
            children: [
                {
                    path: 'create',
                    element: <CreateDevice />,
                },
                {
                    path: 'list',
                    element: <DeviceList />,
                },
            ],
        },
    ],
}

export default PrivateRoutes
