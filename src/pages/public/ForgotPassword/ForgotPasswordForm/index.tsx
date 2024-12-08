import { FC } from 'react'
import { forgotPasswordSchema, ForgotPasswordType } from '@/api/auth/schema'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/Card'
import { useNavigate } from 'react-router-dom'
import { encryptString } from '@/utils/crypto'

export const ForgotPasswordForm: FC = () => {
    const navigate = useNavigate()

    const fpForm = useForm<ForgotPasswordType>({
        mode: 'onSubmit',
        resolver: zodResolver(forgotPasswordSchema),
    })

    const {
        formState: { errors },
    } = fpForm

    const handleInputChange = () => {
        if (fpForm.formState.errors.email) {
            fpForm.clearErrors('email')
        }
    }

    const onSubmit = (data: ForgotPasswordType) => {
        console.log(data)
        const encryptedEmail = encryptString(data.email)
        navigate(`/forgot-password-verification?email=${encryptedEmail}`)
    }

    return (
        <Form {...fpForm}>
            <form
                autoComplete='on'
                noValidate
                className='w-full h-full flex flex-col items-center'
                onSubmit={fpForm.handleSubmit(onSubmit)}
            >
                <Card className=''>
                    <CardContent className='flex flex-col gap-5 pt-5'>
                        <CardTitle className='text-center'>Forgot Password</CardTitle>
                        <p>
                            Enter the email address associated with your account, and we'll send you
                            a link to reset your password.
                        </p>

                        <FormField
                            control={fpForm.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            autoComplete='email'
                                            className='mt-[16px] w-full bg-white'
                                            placeholder='Email Address'
                                            type='email'
                                            {...field}
                                            onInput={handleInputChange}
                                        />
                                    </FormControl>
                                    <FormMessage>{errors?.email?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className='flex flex-row gap-5 items-center justify-center'>
                        <Button variant='outline' className='w-1/2' onClick={() => navigate('/')}>
                            Back
                        </Button>
                        <Button type='submit' className='w-1/2'>
                            Reset Password
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
