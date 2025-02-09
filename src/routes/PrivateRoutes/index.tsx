import PrivateLayout from '@/layouts/PrivateLayout'
import { ActivityLogs } from '@/pages/private/ActivityLogs/Logs'
import { Dashboard } from '@/pages/private/Dashboard'
import { CreateDevice } from '@/pages/private/Devices/CreateDevice'
import { DeviceList } from '@/pages/private/Devices/DeviceList'
import DeviceMapView from '@/pages/private/Devices/DeviceMapView'
import { EditDevice } from '@/pages/private/Devices/EditDevice'
import { CreateEmployee } from '@/pages/private/Employees/CreateEmployee'
import { EditEmployee } from '@/pages/private/Employees/EditEmployee'
import { EmployeeList } from '@/pages/private/Employees/EmployeeList'
import { CreateGroup } from '@/pages/private/Groups/CreateGroup'
import { EditGroup } from '@/pages/private/Groups/EditGroup'
import { GroupList } from '@/pages/private/Groups/GroupList'
import { UserGroup } from '@/pages/private/Groups/UserGroup'
import { NotificationList } from '@/pages/private/Notifications/NotificationList'
import { APIKeys } from '@/pages/private/Settings/APIKeys'
import { TimeEntryList } from '@/pages/private/TImeEntries/TimeEntryList'
import { TimeEntryMapView } from '@/pages/private/TImeEntries/TimeEntryMapView'
import { CreateUser } from '@/pages/private/Users/CreateUser'
import { EditUser } from '@/pages/private/Users/EditUser'
import { UserList } from '@/pages/private/Users/UserList'
import { UserProfile } from '@/pages/private/Users/UserProfile'
import { Outlet, RouteObject } from 'react-router-dom'

// TO DO: append child paths to /dashboard for the sidebar navigation.
// e.g. /dashboard/customers, /schedule, /finance-managmement, etc..

const PrivateRoutes: RouteObject = {
    path: '/',
    element: <PrivateLayout />,
    children: [
        {
            path: '/dashboard',
            children: [
                {
                    element: <Dashboard />,
                    index: true,
                },
            ],
        },
        {
            path: '/user',
            children: [
                {
                    element: <Outlet />,
                    index: true,
                },
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
                {
                    path: 'my-profile',
                    element: <UserProfile />,
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
                    path: 'edit/:id',
                    element: <EditGroup />,
                },
                {
                    path: 'user-group',
                    element: <UserGroup />,
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
                    path: 'edit/:id',
                    element: <EditEmployee />,
                },
                {
                    path: 'time-entries',
                    element: <TimeEntryList />,
                },
                {
                    path: 'time-entries/map-view',
                    element: <TimeEntryMapView />,
                },
            ],
        },
        {
            path: '/notification',
            children: [
                {
                    path: 'list',
                    element: <NotificationList />,
                },
                {
                    path: 'create',
                    element: <CreateEmployee />,
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
                {
                    path: 'edit/:id',
                    element: <EditDevice />,
                },
                {
                    path: 'map-view',
                    element: <DeviceMapView />,
                },
            ],
        },
        {
            path: '/log',
            children: [
                {
                    path: 'activity',
                    element: <ActivityLogs />,
                },
            ],
        },
        {
            path: '/settings',
            children: [
                {
                    path: 'api-keys',
                    element: <APIKeys />,
                },
            ],
        },
    ],
}

export default PrivateRoutes
