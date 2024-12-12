import PublicLayout from '@/layouts/PublicLayout'
import { ForgotPassword } from '@/pages/public/ForgotPassword'
import { ForgotPasswordVerification } from '@/pages/public/ForgotPasswordVerification'
import ResetPassword from '@/pages/public/ResetPassword'
import { SignIn } from '@/pages/public/SignIn'
import { Navigate, RouteObject } from 'react-router-dom'

const PublicRoutes: RouteObject = {
    element: <PublicLayout />,
    children: [
        {
            path: '/',
            element: <Navigate to='/sign-in' replace />,
        },
        {
            path: '/sign-in',
            element: <SignIn />,
        },
        {
            path: '/forgot-password',
            element: <ForgotPassword />,
        },
        {
            path: '/forgot-password-verification',
            element: <ForgotPasswordVerification />,
        },
        {
            path: '/reset-password',
            element: <ResetPassword />,
        },
    ],
}

export default PublicRoutes
