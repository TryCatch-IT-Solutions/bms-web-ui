import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInSchema, SignInType } from '@/api/auth/schema'
import { Form, FormControl, FormField, FormItem, FormMessage, FormTitle } from '@/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/Input'
import { PasswordInput } from '@/components/PasswordInput'
import { Button } from '@/components/Button'

export const SignInForm: FC = () => {
    const signInForm = useForm<SignInType>({
        mode: 'onSubmit',
        resolver: zodResolver(signInSchema),
    })

    const navigate = useNavigate()

    const {
        formState: { errors },
    } = signInForm

    const handleInputChange = () => {
        if (signInForm.formState.errors.email) {
            signInForm.clearErrors('email')
        }
    }

    const handleSubmit = (data: SignInType) => {
        console.log(data)
    }

    return (
        <Form {...signInForm}>
            <form
                autoComplete='on'
                noValidate
                className='w-full h-full flex flex-col items-center'
                onSubmit={signInForm.handleSubmit(handleSubmit)}
            >
                <FormTitle
                    className='text-2xl text-zentive-green-dark w-full text-center font-semibold'
                    headingLevel={1}
                    title='Sign In'
                />
                <FormField
                    control={signInForm.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    autoComplete='email'
                                    className='mt-[16px] w-100 bg-white'
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
                <FormField
                    control={signInForm.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput
                                    // autoComplete='password'
                                    criteria={false}
                                    className='mt-[16px] w-100 bg-white'
                                    placeholder='Password'
                                    {...field}
                                    onInput={handleInputChange}
                                />
                            </FormControl>
                            <FormMessage>{errors?.password?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <Button
                    className='w-100 mt-3 hover:bg-zentive-green-medium'
                    type='submit'
                    onClick={() => navigate('/dashboard')}
                >
                    Sign In
                </Button>
                <div className='flex items-center justify-centerw-100 mt-[24px]'>
                    <Link to='/forgot-password' className='hover:underline hover:text-bms-link'>
                        Forgot Password? Click here.
                    </Link>
                </div>
            </form>
        </Form>
    )
}
