// src/components/UnauthorizedPage.tsx

import React from 'react'
import { Lock, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='bg-white bg-opacity-60 p-8 rounded-lg shadow-lg text-bms-gray-500 text-center max-w-md w-full'>
                <div className='flex justify-center gap-6 mb-8'>
                    <Lock size={80} color='#e9212b' />
                    <AlertTriangle size={80} color='#e9212b' />
                </div>
                <h1 className='text-4xl font-bold mb-4'>401 - Unauthorized</h1>
                <p className='text-lg mb-6'>
                    Oops! You don’t have permission to access this page. Please check your
                    credentials or contact support.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className='bg-red-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-red-400 transition duration-300'
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}
