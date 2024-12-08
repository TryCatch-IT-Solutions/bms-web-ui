import PrivateLayout from '@/layouts/PrivateLayout'
import { RouteObject } from 'react-router-dom'

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
                    element: <></>,
                    index: true,
                },
            ],
        },
    ],
}

export default PrivateRoutes
