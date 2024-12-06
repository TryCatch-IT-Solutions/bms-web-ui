import PrivateLayout from "@/layouts/PrivateLayout"
import { RouteObject } from "react-router-dom"

const PrivateRoutes: RouteObject = {
    path: '/',
    element: (
            <PrivateLayout />
    ),
    // children: [
    //     {
    //         path: '/dashboard',
    //         children: [
    //             {
    //                 element: <Dashboard />,
    //                 index: true,
    //             },
    //         ],
    //     },
    // ]
}

export default PrivateRoutes
