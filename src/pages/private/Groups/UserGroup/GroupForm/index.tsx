import { EditGroupType, editGroupSchema } from '@/api/group/schema'
import { Button } from '@/components/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'
import { GroupMemberTable } from './GroupMemberTable'
import { Trash2Icon } from 'lucide-react'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getGroupByid, updateGroupName } from '@/api/group'
import Spinner from '@/components/Spinner'
import { ProfileType } from '@/api/profile/schema'
import { useToast } from '@/hooks/useToast'
import { AxiosError } from 'axios'
import AdminListModal from './AdminListModal'
import EmployeeListModal from './EmployeeListModal'
import { Card, CardContent, CardHeader } from '@/components/Card'
import { zodResolver } from '@hookform/resolvers/zod'
import RemoveEmpToGroupModal from './RemoveEmpToGroupModal'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/store/user'
import { NoGroup } from './NoGroup'
import { employeeGroupToRemoveAtom } from '@/store/groups'
import { SyncNotificationBar } from '@/components/SyncNofificationBar'

export const GroupForm: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [removeModal, setRemoveModal] = useState<boolean>(false)
    const [groupAdminModal, setGroupAdminModal] = useState<boolean>(false)
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const emptToRemove = useAtomValue(employeeGroupToRemoveAtom)

    const user = useAtomValue(userAtom)

    const { data: group, isLoading } = useQuery({
        queryKey: ['editGroup', user?.group_id],
        queryFn: () => getGroupByid(user?.group_id ?? 0),
        enabled: user?.group_id !== null,
    })

    const groupForm = useForm<EditGroupType>({
        mode: 'onSubmit',
        resolver: zodResolver(editGroupSchema),
        defaultValues: {
            id: user?.group_id ?? 0,
            name: group?.name,
            group_admin: group?.group_admin?.id,
            admin_profile: group?.group_admin,
        },
    })

    const {
        handleSubmit,
        watch,
        formState: { errors },
    } = groupForm

    const adminProfile = watch('admin_profile')

    const { mutate: updateGroupNameMu } = useMutation<unknown, AxiosError, EditGroupType>({
        mutationFn: updateGroupName,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editGroup'] })
            queryClient.invalidateQueries({ queryKey: ['groupList'] })
            toast({
                description: 'Group Information Updated Successfully',
            })
            navigate('/group/list')
        },
    })

    const onSubmit = (data: EditGroupType) => {
        updateGroupNameMu(data)
    }

    useEffect(() => {
        if (group) {
            groupForm.reset({
                id: user?.group_id ?? 0,
                name: group?.name,
                group_admin: group?.group_admin?.id,
                admin_profile: group?.group_admin,
            })
        }
    }, [group])

    return isLoading ? (
        <Spinner variant='normal' className='h-[8rem] w-[8rem]' />
    ) : user?.group_id !== null ? (
        <div className='flex flex-col gap-10'>
            <Card>
                <CardHeader>
                    <p className='font-semibold text-xl text-bms-gray-medium'>Group Information</p>
                </CardHeader>
                <CardContent>
                    <Form {...groupForm}>
                        <form
                            autoComplete='on'
                            noValidate
                            className='w-full h-full max-w-[50%]'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className='flex flex-col gap-5 items-start'>
                                <div className='w-[100%]'>
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
                                                        disabled
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>{errors?.name?.message}</FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='flex flex-row gap-5 items-center mt-3'>
                                    <p>Group Admin: </p>
                                    <Button
                                        className='bg-gray-500 hover:bg-gray-400'
                                        onClick={() => setGroupAdminModal(true)}
                                        type='button'
                                        disabled
                                    >
                                        {adminProfile
                                            ? adminProfile.first_name +
                                              ' ' +
                                              adminProfile?.last_name
                                            : 'Select Group Admin'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                        <AdminListModal open={groupAdminModal} setOpen={setGroupAdminModal} />
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-row items-cenrer justify-between mt-5'>
                            <p className='font-semibold text-xl text-bms-gray-medium'>Employees</p>
                            <SyncNotificationBar />
                            <div className='flex flex-row gap-5'>
                                <Button
                                    onClick={() => setRemoveModal(true)}
                                    variant='outline'
                                    type='button'
                                    className='flex flex-row gap-2'
                                    disabled={
                                        emptToRemove === null ||
                                        emptToRemove?.employees?.length === 0
                                    }
                                >
                                    Remove
                                    <Trash2Icon className='w-5' />
                                </Button>
                                <Button
                                    onClick={() => setOpen(true)}
                                    variant='outline'
                                    className='flex flex-row gap-2'
                                    type='button'
                                >
                                    Add Employee
                                </Button>
                            </div>
                        </div>
                        <GroupMemberTable employees={group?.employees as ProfileType[]} />
                    </div>
                    <EmployeeListModal
                        open={open}
                        setOpen={setOpen}
                        group_id={user?.group_id ?? 0}
                    />
                    <RemoveEmpToGroupModal
                        open={removeModal}
                        setOpen={setRemoveModal}
                        groupId={user?.group_id ?? 0}
                    />
                </CardContent>
            </Card>
        </div>
    ) : (
        <NoGroup />
    )
}
