import PublicLayout from '@/layouts/PublicLayout'
import SignIn from '@/pages/public/SignIn'
import { Navigate, RouteObject } from 'react-router-dom'

const PublicRoutes: RouteObject = {
    element: (
            <PublicLayout />
    ),
    children: [
        {
            path: '/',
            element: <Navigate to='/sign-in' replace />,
        },
         {
            path: '/sign-in',
            element: <SignIn />,
        },
    ],
}

export default PublicRoutes
