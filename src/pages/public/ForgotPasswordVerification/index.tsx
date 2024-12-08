import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { useResendTimer } from '@/hooks/useResendTimer'
import { useToast } from '@/hooks/useToast'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import emailLogo from '@/assets/common/email.svg'
import { decryptString } from '@/utils/crypto'
import { useMutation } from '@tanstack/react-query'

export const ForgotPasswordVerification: React.FC = () => {
    const { displayText, isTimerActive, triggerCountdown } = useResendTimer()
    const { toast } = useToast()

    const searchParam = new URLSearchParams(window.location.search)
    const emailParams = searchParam.get('email')
    const [decryptedEmail, setDecryptedEmail] = useState<string>(emailParams ?? '')

    const navigate = useNavigate()

    const sendForgotPasswordConfirmation = (email: string): Promise<boolean> => {
        console.log(email)
        // Simulating async behavior for the confirmation
        return Promise.resolve(true) // or some actual async operation
    }

    const { mutate: resetPasswordMu } = useMutation({
        mutationFn: () => sendForgotPasswordConfirmation(decryptedEmail),
        onSuccess: () => {
            toast({
                description: 'Reset password link sent',
                variant: 'default',
            })

            triggerCountdown()
        },
        onError: () => {
            toast({
                description: 'There was an error resending.',
                variant: 'destructive',
            })
        },
    })

    useEffect(() => {
        emailParams && setDecryptedEmail(decryptString(emailParams))
        if (!emailParams) {
            navigate('/')
        }
    }, [searchParam])

    const onResendClick = () => {
        resetPasswordMu()
    }
    return (
        <div className='flex items-center justify-center h-[50vw]'>
            <div className='bg-white bg-no-repeat bg-clip-padding box-shadow border rounded-lg opacity-100'>
                <Card>
                    <CardHeader>
                        <div className='flex justify-center w-full my-5'>
                            <img src={emailLogo} alt='email-logo' className=' h-[60px] w-[60px]' />
                        </div>
                        <CardTitle className='text-zentive-green-dark text-center'>
                            Check Your Mailbox
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='text-center mb-5'>
                        <div className='text-gray-400 w-107 text-left'>
                            <p className='text-center'>
                                We've sent an reset password email to{' '}
                                <b className='text-zentive-gray-medium'>{decryptedEmail}</b>.
                            </p>
                        </div>
                        <div className='my-4'>
                            <NavLink to='/sign-in' className='font-bold text-zentive-green-dark '>
                                {' '}
                                Back to Login
                            </NavLink>
                        </div>
                        <div>
                            <p className='text-gray-400'>
                                {isTimerActive ? (
                                    displayText
                                ) : (
                                    <>
                                        Didn't get the email?
                                        <button
                                            className='text-bms-link mx-1'
                                            onClick={onResendClick}
                                        >
                                            Click here to resend it
                                        </button>
                                    </>
                                )}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
