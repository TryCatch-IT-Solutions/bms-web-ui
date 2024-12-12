import { Card, CardContent, CardFooter, CardTitle } from '@/components/Card'
import { Button } from '@/components/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { updatePasswordSchema, UpdatePasswordType } from '@/api/auth/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createNewPassword } from '@/api/auth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'
import { useEffect } from 'react'
import { PasswordInput } from '@/components/PasswordInput'

const ResetPassword = () => {
    const updatePasswordForm = useForm<UpdatePasswordType>({
        mode: 'onSubmit',
        resolver: zodResolver(updatePasswordSchema),
    })

    const url = new URL(window.location.href)

    const navigate = useNavigate()
    const { toast } = useToast()

    // Extract the token and email
    const tokenParam = url.searchParams.get('token')
    const emailParam = url.searchParams.get('email')

    const {
        handleSubmit,
        setValue,
        formState: { isValid, errors },
    } = updatePasswordForm

    const { mutate: createNewPasswordMu, isPending } = useMutation({
        mutationFn: createNewPassword,
        onSuccess: () => {
            toast({
                description: 'Password Updated, please signin',
            })
            navigate('/sign-in')
        },
    })

    const onSubmit = (data: UpdatePasswordType) => {
        createNewPasswordMu(data)
    }

    useEffect(() => {
        setValue('token', tokenParam ?? '')
        setValue('email', emailParam ?? '')
    }, [tokenParam, emailParam])

    return (
        <div className='flex justify-center items-center h-[50vw]'>
            <div className='w-140 h-160'>
                <Form {...updatePasswordForm}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card className='flex flex-col items-center justify-center h-[40rem]'>
                            <CardTitle className='text-zentive-green-dark mt-5 text-center py-6'>
                                Create New Password
                            </CardTitle>
                            <CardContent>
                                <div className='w-[100%]'>
                                    <FormField
                                        control={updatePasswordForm.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <PasswordInput
                                                        hasConfirmPassword
                                                        className='mt-[16px] bg-white'
                                                        placeholder='Password'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.password?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={updatePasswordForm.control}
                                        name='confirmPassword'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <PasswordInput
                                                        className='mt-[16px] bg-white'
                                                        placeholder='Confirm Password'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.confirmPassword?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='w-full flex flex-col gap-3 mt-4 bg-zentive-gray-bg pr-[26px] pb-[15px] pt-[6px]'>
                                <Button
                                    className='w-[60%] mt-4'
                                    type='submit'
                                    disabled={!isValid || isPending}
                                >
                                    Create New Password
                                </Button>
                                <Button
                                    className='w-[60%] mt-4'
                                    variant='outline'
                                    type='button'
                                    onClick={() => navigate('/sign-in')}
                                >
                                    Cancel
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ResetPassword
