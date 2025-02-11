import { Card } from '@/components/Card'
import { SignInForm } from './SignInForm'

export const SignIn: React.FC = () => {
    return (
        <div className='flex justify-center items-center h-screen overflow-y-hidden'>
            <div className='sign-in-overlay flex justify-center items-center w-140 h-160 xs:w-full xs:h-auto overflow-y-hidden'>
                <Card className='p-10 overflow-y-hidden'>
                    <SignInForm />
                </Card>
            </div>
        </div>
    )
}
