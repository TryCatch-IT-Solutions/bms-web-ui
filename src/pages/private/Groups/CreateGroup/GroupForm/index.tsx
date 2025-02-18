import { createGroupSchema, CreateGroupType } from '@/api/group/schema'
import { Button } from '@/components/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'
import { GroupMemberTable } from './GroupMemberTable'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createGroup } from '@/api/group'
import { useToast } from '@/hooks/useToast'
// import { zodResolver } from '@hookform/resolvers/zod'
import { logZodResolver } from '@/utils/helper'

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
        // watch,
        formState: { errors },
    } = groupForm

    // const groupName = watch('name')
    // const empIds = watch('employees')
    // const adminId = watch('group_admin')

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

    // const isValid =
    //     groupName !== '' &&
    //     groupName !== undefined &&
    //     adminId !== undefined &&
    //     adminId > 0 &&
    //     empIds?.length > 0

    return (
        <Form {...groupForm}>
            <form
                autoComplete='on'
                noValidate
                className='flex flex-col gap-5 w-full h-full max-w-[80%] xs:max-w-full'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex gap-5 items-center'>
                    <div className='w-1/2 xs:w-[100%]'>
                        <FormField
                            control={groupForm.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className='mt-[16px] w-[50%] xs:w-[100%] bg-white'
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

                <div className='flex flex-row gap-5 items-center justify-end xs:justify-center mt-5'>
                    <Button
                        className='xs:w-full sm:w-full'
                        variant='outline'
                        onClick={() => navigate(-1)}
                        type='button'
                    >
                        Cancel
                    </Button>
                    <Button
                        className='xs:w-full sm:w-full'
                        type='submit'
                        // disabled={!isValid || isPending}
                    >
                        Create Group
                    </Button>
                </div>
            </form>
        </Form>
    )
}
