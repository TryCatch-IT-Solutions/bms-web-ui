import { createGroupSchema, CreateGroupType } from '@/api/group/schema'
import { Button } from '@/components/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'
import { GroupMemberTable } from './GroupMemberTable'
import { useNavigate } from 'react-router-dom'
import { logZodResolver } from '@/utils/helper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createGroup } from '@/api/group'
import { useToast } from '@/hooks/useToast'

export const GroupForm: React.FC = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const groupForm = useForm<CreateGroupType>({
        mode: 'onChange',
        resolver: logZodResolver(createGroupSchema),
    })

    const { toast } = useToast()

    const {
        handleSubmit,
        formState: { errors, isValid },
    } = groupForm

    const { mutate: createGroupMu } = useMutation({
        mutationFn: createGroup,
        onSuccess: () => {
            toast({
                description: 'Group Created Successfully',
            })

            queryClient.invalidateQueries({ queryKey: ['groupList'] })
            navigate('/group/list')
        },
    })

    const onSubmit = (data: CreateGroupType) => {
        createGroupMu(data)
    }

    return (
        <Form {...groupForm}>
            <form
                autoComplete='on'
                noValidate
                className='flex flex-col gap-5 w-full h-full max-w-[80%]'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-row gap-5 items-center'>
                    <div className='w-1/2'>
                        <FormField
                            control={groupForm.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className='mt-[16px] w-[50%] bg-white'
                                            placeholder='Group Name'
                                            type='text'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>{errors?.name?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className='mt-5'>
                    <GroupMemberTable />
                </div>

                <div className='flex flex-row gap-5 items-center justify-end mt-5'>
                    <Button variant='outline' onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={!isValid}>
                        Create Group
                    </Button>
                </div>
            </form>
        </Form>
    )
}
