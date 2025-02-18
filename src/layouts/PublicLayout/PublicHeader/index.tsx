// import { Link } from 'react-router-dom'
import daiLogo from '@/assets/dai-logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const PublicHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPage = location.pathname
    return (
        <header className='h-[75px] px-[36px] py-[16px] flex items-center justify-between bg-white shadow-md sticky top-0 z-50 '>
            <img
                onClick={() => {
                    navigate('/sign-in')
                }}
                src={daiLogo}
                alt='Zentive Logo'
                className='h-14 w-54 cursor-pointer'
            />
            {currentPage === '/sign-up' && (
                <Link
                    className='text-lg text-zentive-green-dark bg-transparent hover:text-zentive-blue-dark hover:underline font-semibold py-2 px-4 rounded'
                    to='/sign-in'
                >
                    Sign In
                </Link>
            )}

            <p className='text-bms-gray-400'>v1.0.0</p>
        </header>
    )
}

export default PublicHeader
