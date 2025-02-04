import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter } from '@/components/Card'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { overridePasswordSChema, OverridePasswordType } from '@/api/auth/schema'
import { overridePassowrd } from '@/api/auth'
import { PasswordInput } from '@/components/PasswordInput'
import { useEffect } from 'react'

export const PasswordForm: React.FC = () => {
    const navigate = useNavigate()
    const { toast } = useToast()

    const userForm = useForm<OverridePasswordType>({
        mode: 'onChange',
        resolver: zodResolver(overridePasswordSChema),
    })

    const { id } = useParams()

    const numericId = Number(id)

    const {
        setValue,
        formState: { errors, isValid },
    } = userForm

    const { mutate: updateUserPasswordMu, isPending } = useMutation({
        mutationFn: overridePassowrd,
        onSuccess: () => {
            toast({
                description: 'Password updated successfully',
                duration: 2000,
            })
            navigate(-1)
        },
        onError: () => {
            toast({
                description: 'Your password is incorrect.',
                variant: 'destructive',
                duration: 2000,
            })
        },
    })

    const onSubmit = (data: OverridePasswordType) => {
        updateUserPasswordMu(data)
    }

    useEffect(() => {
        setValue('id', numericId)
    }, [])

    return (
        <div>
            <Form {...userForm}>
                <form
                    autoComplete='on'
                    noValidate
                    className='w-full h-full max-w-[80%]'
                    onSubmit={userForm.handleSubmit(onSubmit)}
                >
                    <Card className=''>
                        <CardContent className='min-w-[64.59rem] min-h-[37.125rem] flex flex-col gap-5 pt-5'>
                            <div className='flex flex-row gap-3 items-center justify-start'>
                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='new_password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <PasswordInput
                                                        hasConfirmPassword
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='New Password'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.new_password?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='new_password_confirmation'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <PasswordInput
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Confirm Password'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.new_password_confirmation?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className='flex flex-row gap-5 items-center justify-end'>
                            <Button
                                variant='outline'
                                className='w-1/5'
                                onClick={() => navigate('/user/list')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                className='w-1/5'
                                disabled={!isValid || isPending}
                            >
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    )
}
