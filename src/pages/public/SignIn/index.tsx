import { useLocation } from 'react-router-dom'
import { cn } from '@/utils/helper'
import SignInForm from './SiginInForm'


const SignIn = () => {
    const { pathname } = useLocation()

    return (
        <div
            className={cn(
                'flex justify-center items-center z-0',
                pathname === '/sign-in' ? 'sign-in-bg' : 'crew-sign-in-bg',
            )}
        >
           
            <div className='sign-in-overlay w-140 h-160'>
                <SignInForm />
            </div>
            

        </div>
    )
}

export default SignIn
