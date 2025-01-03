import { createBrowserRouter } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { Navigate } from 'react-router-dom'
import NotFoundPage from '@/pages/common/error/404'
import { UnauthorizedPage } from '@/pages/common/error/401'

export const Routes = createBrowserRouter([
    {
        path: '404',
        element: <NotFoundPage />,
    },
    {
        path: '401',
        element: <UnauthorizedPage />,
    },
    {
        path: '*',
        element: <Navigate to='/404' replace />,
    },
    PublicRoutes,
    PrivateRoutes,
])

export default Routes
