import { creteAnnouncement } from '@/api/announcements'
import { createAnnouncementSchema, CreateAnnouncementType } from '@/api/announcements/schema'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter } from '@/components/Card'
import { Checkbox } from '@/components/Checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'
import { useToast } from '@/hooks/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Users2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UsersListModal from './UsersListModal'
import { useState } from 'react'

export const CreateAnnouncement: React.FC = () => {
    const announementForm = useForm<CreateAnnouncementType>({
        mode: 'onChange',
        resolver: zodResolver(createAnnouncementSchema),
    })

    const [isGeneral, setIsGeneral] = useState<boolean>(false)
    const [usersModal, setUsersModal] = useState<boolean>(false)

    const { toast } = useToast()
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isValid },
    } = announementForm

    const navigate = useNavigate()

    const { mutate: createAnnouncementMu, isPending } = useMutation<
        unknown,
        AxiosError,
        CreateAnnouncementType
    >({
        mutationFn: creteAnnouncement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userNotifications'] })
            queryClient.invalidateQueries({ queryKey: ['generalNotifications'] })
            toast({
                description: 'Announcement Created Successfully',
            })

            navigate('/notification/list')
        },
    })

    const onSubmit = (data: CreateAnnouncementType) => {
        if (isGeneral) {
            setValue('user_id', undefined)
        }
        createAnnouncementMu(data)
    }

    return (
        <div className='content'>
            <BreadCrumbs origin='Announcement' title='Create Announcement' />

            <Form {...announementForm}>
                <form className='w-[60%]' onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardContent>
                            <div className='flex flex-row gap-5 items-center mt-5'>
                                <Button
                                    className='gap-2'
                                    type='button'
                                    onClick={() => setUsersModal(true)}
                                    disabled={isGeneral}
                                >
                                    Select Users
                                    <Users2Icon />
                                </Button>
                                {getValues('user_id') && <p>1 User Selected</p>}
                                <FormField
                                    control={announementForm.control}
                                    name='expiration'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className='w-full bg-white'
                                                    placeholder='Expiration Date'
                                                    type='date'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>{errors?.title?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <div className='flex flex-row gap-5 items-center text-gray-500'>
                                    General Announcement
                                    <Checkbox
                                        checked={isGeneral}
                                        onClick={() => {
                                            setValue('user_id', undefined)
                                            setIsGeneral(!isGeneral)
                                        }}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={announementForm.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className='mt-[16px] w-[100%] bg-white'
                                                placeholder='Title'
                                                type='text'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors?.title?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={announementForm.control}
                                name='message'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <TextArea
                                                className='mt-[16px] w-[100%] bg-white pt-10'
                                                placeholder='Message'
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors?.title?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className='flex flex-row gap-5 items-center justify-end'>
                            <Button
                                variant='outline'
                                className='w-1/5'
                                onClick={() => navigate('/notification/list')}
                                disabled={isPending}
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
                <UsersListModal open={usersModal} setOpen={setUsersModal} />
            </Form>
        </div>
    )
}
