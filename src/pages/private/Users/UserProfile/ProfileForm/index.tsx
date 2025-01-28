import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter } from '@/components/Card'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'
import { profileSchema, EditUserType, ProfileType } from '@/api/profile/schema'
import { Dropdown } from '@/components/DropdownInput'
import { GENDER_OPTIONS, ROLE_VALUES } from '@/constants'
import PhoneNumberInput from '@/components/PhoneNumberInput'
import { editUser, getUserById } from '@/api/profile'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import Spinner from '@/components/Spinner'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user'
import { zodResolver } from '@hookform/resolvers/zod'

export const ProfileForm: React.FC = () => {
    const navigate = useNavigate()
    const { toast } = useToast()

    const [userProfile, setUserProfile] = useAtom(userAtom)

    const { data: user, isLoading } = useQuery({
        queryKey: ['editUserProfile', userProfile],
        queryFn: () => getUserById(userProfile?.id ?? 0),
        enabled: !!userProfile,
    })

    const userForm = useForm<EditUserType>({
        mode: 'onChange',
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            role: '',
            address1: '',
            address2: '',
            barangay: '',
            municipality: '',
            province: '',
            zip_code: '',
            birth_date: '',
            gender: '',
            phone_number: '',
            emergency_contact_name: '',
            emergency_contact_no: '',
        },
    })

    const {
        setValue,
        formState: { errors, isValid, isDirty },
    } = userForm

    const { mutate: updateUserMu } = useMutation({
        mutationFn: editUser,
        onSuccess: () => {
            toast({
                description: 'User updated successfully',
                duration: 2000,
            })
            setUserProfile(userForm.getValues() as ProfileType)
            navigate(-1)
        },
    })

    const onSubmit = (data: EditUserType) => {
        updateUserMu(data)
    }

    useEffect(() => {
        setValue('is_synced', user?.is_synced ?? 0)
    }, [])

    useEffect(() => {
        if (user) {
            userForm.reset(user)
        }
    }, [user])

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
                            {isLoading ? (
                                <div className='flex flex-col items-center justify-center'>
                                    <Spinner
                                        variant='normal'
                                        className='h-[10rem] w-[10rem] my-[100%]'
                                    />
                                </div>
                            ) : (
                                <>
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
                                                        <FormMessage>
                                                            {errors?.email?.message}
                                                        </FormMessage>
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
                                                        <FormMessage>
                                                            {errors?.gender?.message}
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
                                                name='role'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Dropdown
                                                                className='mt-[16px] w-[100%] bg-white'
                                                                placeholder='Role'
                                                                options={ROLE_VALUES}
                                                                disabled
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage>
                                                            {errors?.role?.message}
                                                        </FormMessage>
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
                                                                type='text'
                                                                value={field.value ?? ''}
                                                                onChange={field.onChange}
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
                                                                type='number'
                                                                onKeyDown={(e) => {
                                                                    if (
                                                                        e.key === '-' ||
                                                                        e.key === '+' ||
                                                                        e.key === 'e' ||
                                                                        e.key === 'E'
                                                                    ) {
                                                                        e.preventDefault()
                                                                    }
                                                                }}
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
                                                            {
                                                                errors?.emergency_contact_name
                                                                    ?.message
                                                            }
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
                                                            {errors?.phone_number?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                        {!isLoading && (
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
                                    disabled={!isValid || !isDirty}
                                >
                                    Submit
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </form>
            </Form>
        </div>
    )
}
