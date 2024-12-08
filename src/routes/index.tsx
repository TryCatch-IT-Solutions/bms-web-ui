import { createBrowserRouter } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { Navigate } from 'react-router-dom'
import { Error404 } from '@/pages/common/error/404'
import { Error403 } from '@/pages/common/error/403'

export const Routes = createBrowserRouter([
    {
        path: '404',
        element: <Error404 />,
    },
    {
        path: '403',
        element: <Error403 />,
    },
    {
        path: '*',
        element: <Navigate to='/404' replace />,
    },
    PublicRoutes,
    PrivateRoutes,
])

export default Routes
