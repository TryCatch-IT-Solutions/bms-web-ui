import { Link, useNavigate } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormMessage, FormTitle } from '@/components/Forms'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { InputPassword } from '@/components/InputPassword'
import { zodResolver } from '@hookform/resolvers/zod'
// import RememberMe from '../RememberMe'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signInSchema, SignInType } from '@/api/auth/schema'

const SignInForm = () => {

    const [isSubmitted, setIsSubmitted] = useState(false)

    const navigate = useNavigate()

    const signInForm = useForm<SignInType>({
        mode: 'onSubmit',
        resolver: zodResolver(signInSchema),
    })

    const handleInputChange = () => {
        setIsSubmitted(false)
        if (signInForm.formState.errors.email) {
            signInForm.clearErrors('email')
        }
    }

    const handleButtonClick = () => {
        setIsSubmitted(true)
    }

    const handleSubmit = (data: SignInType) => console.log('data', data)

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
                            {isSubmitted && signInForm.formState.errors.email && (
                                <FormMessage>
                                    {signInForm.formState.errors.email.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={signInForm.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputPassword
                                    // autoComplete='password'
                                    criteria={false}
                                    className='mt-[16px] w-100 bg-white'
                                    placeholder='Password'
                                    {...field}
                                    onInput={handleInputChange}
                                />
                            </FormControl>
                            {isSubmitted && signInForm.formState.errors.password && (
                                <FormMessage>
                                    {signInForm.formState.errors.password.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                {/* <div className='flex items-center justify-between w-100 mt-[12px]'>
                    <RememberMe />
                </div> */}
                <Button
                    className='w-100 mt-3 hover:bg-zentive-green-medium'
                    type='submit'
                    onClick={handleButtonClick}
                >
                    Sign In
                </Button>
                <div className='flex items-center justify-centerw-100 mt-[24px]'>
                    <Link to='/forgot-password' className='text-zentive-blue-dark hover:underline'>
                        Forgot Password?
                    </Link>
                </div>
                <div>
                    <p className='text-base text-center mt-[24px]'>
                        Not a user yet?{' '}
                        <Link to='/sign-up' className='text-zentive-green-dark hover:underline'>
                            Sign Up here
                        </Link>
                    </p>
                </div>
                <div className='flex items-center w-full max-w-md mt-6 mb-4'>
                    <hr className='flex-grow border-t-2 border-zentive-gray-light left-96 ml-4' />
                    <span className='px-4 text-zentive-gray-medium font-sans-pro m-0 pr-2 pl-2'>
                        OR
                    </span>
                    <hr className='flex-grow border-t-2 border-zentive-gray-light right-96 mr-4' />
                </div>
                <div>
                    <Button
                        className='w-100 font-semibold hover:bg-zentive-green-medium hover:text-zentive-bg-100 hover:border-zentive-green-medium'
                        variant='outline'
                        type='submit'
                        onClick={() => navigate('/crew/sign-in')}
                    >
                        Sign In as Crew Member
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SignInForm
