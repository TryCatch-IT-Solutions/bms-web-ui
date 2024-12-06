import { createBrowserRouter, Navigate } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

// TO DO: add route authentication and error page handler.

export const Routes = createBrowserRouter([
    {
        path: '404',
        // element: <Error404 />,
    },
    {
        path: '403',
        // element: <Error403 />,
    },
    {
        path: 'error',
        // element: <LinkExpired />,
    },
    {
        path: '*',
        element: <Navigate to='/404' replace />,
    },
    PublicRoutes,
    PrivateRoutes,
])

export default Routes
