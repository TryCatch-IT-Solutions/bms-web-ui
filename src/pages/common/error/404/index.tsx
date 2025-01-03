// src/components/NotFoundPage.tsx

import React from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='bg-white p-10 rounded-lg shadow-2xl text-gray-500 text-center max-w-lg w-full'>
                <div className='flex justify-center gap-6 mb-8'>
                    <Search size={80} color='#e9212b' />
                    <ArrowRight size={80} color='#e9212b' />
                </div>
                <h1 className='text-5xl font-extrabold mb-6'>404 - Page Not Found</h1>
                <p className='text-xl mb-6'>
                    We couldn't find the page you were looking for. Don't worry, it happens!
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className='bg-bms-primary text-white py-3 px-8 rounded-lg text-lg hover:bg-bms-primary/60 transition duration-300'
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default NotFoundPage
