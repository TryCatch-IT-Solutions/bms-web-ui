import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter } from '@/components/Card'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'
import { createUserSchema, CreateUserType } from '@/api/profile/schema'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Dropdown } from '@/components/DropdownInput'
import { GENDER_OPTIONS, ROLE_VALUES, USER_STATUS } from '@/constants'
import PhoneNumberInput from '@/components/PhoneNumberInput'
import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '@/api/profile'
import { logZodResolver } from '@/utils/helper'
import { PasswordInput } from '@/components/PasswordInput'

export const CreateUser: React.FC = () => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const userForm = useForm<CreateUserType>({
        mode: 'onChange',
        resolver: logZodResolver(createUserSchema),
    })

    const {
        setValue,
        formState: { errors, isValid },
    } = userForm

    const { mutate: createUserMu } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usersList'] })
            navigate(`/user/list`)
        },
        onError: () => {
            toast({
                description: 'Failed to create user',
                variant: 'destructive',
            })
        },
    })

    const onSubmit = (data: CreateUserType) => {
        createUserMu(data)
    }

    useEffect(() => {
        setValue('status', USER_STATUS.ACTIVATED)
    }, [])

    return (
        <div className='content'>
            <BreadCrumbs title='Register User' origin='Users' />
            <Form {...userForm}>
                <form
                    autoComplete='on'
                    noValidate
                    className='w-full h-full max-w-[80%]'
                    onSubmit={userForm.handleSubmit(onSubmit)}
                >
                    <Card className=''>
                        <CardContent className='flex flex-col gap-5 pt-5'>
                            <div className='flex flex-row gap-3 items-center justify-start'>
                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='first_name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='First Name'
                                                        type='text'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.first_name?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='middle_name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Middle Name'
                                                        type='email'
                                                        onChange={field.onChange}
                                                        value={field.value ?? ''}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.middle_name?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='last_name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Last Name'
                                                        type='text'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.last_name?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row gap-3 items-center justify-start'>
                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Email'
                                                        type='email'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>{errors?.email?.message}</FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='phone_number'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <PhoneNumberInput
                                                        inputProps={{
                                                            name: 'Contact Number',
                                                            placeholder: 'Contact Number',
                                                        }}
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.phone_number?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='gender'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Dropdown
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Gender'
                                                        options={GENDER_OPTIONS}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>{errors?.gender?.message}</FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row gap-3 items-center justify-start'>
                                <div className='w-1/3 max-w-[32.5%]'>
                                    <FormField
                                        control={userForm.control}
                                        name='role'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Dropdown
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Role'
                                                        options={ROLE_VALUES}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>{errors?.role?.message}</FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='w-1/3 max-w-[32.5%]'>
                                    <FormField
                                        control={userForm.control}
                                        name='birth_date'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Birth Date'
                                                        type='date'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.birth_date?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row gap-3 items-center justify-start'>
                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='address1'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Address 1'
                                                        type='text'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.address1?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='address2'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Address 2'
                                                        type='email'
                                                        value={field.value ?? ''}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.address2?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='barangay'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Barangay'
                                                        type='text'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.barangay?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row gap-3 items-center justify-start'>
                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='municipality'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Municipality'
                                                        type='email'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.municipality?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='province'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Province'
                                                        type='text'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.province?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='w-1/3'>
                                    <FormField
                                        control={userForm.control}
                                        name='zip_code'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Zip Code'
                                                        type='text'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.zip_code?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row gap-3 items-center justify-start'>
                                <div className='w-1/3 max-w-[32.5%]'>
                                    <FormField
                                        control={userForm.control}
                                        name='emergency_contact_name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        placeholder='Emergency Contact Name'
                                                        type='text'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.municipality?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='w-1/3 max-w-[32.5%]'>
                                    <FormField
                                        control={userForm.control}
                                        name='emergency_contact_no'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <PhoneNumberInput
                                                        inputProps={{
                                                            name: 'Emergency Contact Number',
                                                            placeholder: 'Contact Number',
                                                        }}
                                                        className='mt-[16px] w-[100%] bg-white'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.province?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row gap-3 items-center justify-start'>
                                <div className='w-1/3 max-w-[32.5%] mb-[12rem]'>
                                    <FormField
                                        control={userForm.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <PasswordInput
                                                        hasConfirmPassword
                                                        className='mt-[16px] w-[100%] bg-white'
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
                                </div>

                                <div className='w-1/3 max-w-[32.5%] mb-[12rem]'>
                                    <FormField
                                        control={userForm.control}
                                        name='confirmPassword'
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
                                                    {errors?.confirmPassword?.message}
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
                            <Button type='submit' className='w-1/5' disabled={!isValid}>
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    )
}
