import { Card } from '@/components/Card'
import { SignInForm } from './SignInForm'

export const SignIn: React.FC = () => {
    return (
        <div className='flex justify-center items-center h-[50vw]'>
            <div className='sign-in-overlay w-140 h-160'>
                <Card className='p-10'>
                    <SignInForm />
                </Card>
            </div>
        </div>
    )
}
