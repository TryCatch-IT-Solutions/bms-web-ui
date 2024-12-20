import { groupSchema, CreateGroupType } from '@/api/group/schema'
import { Button } from '@/components/Button'
import { Dropdown } from '@/components/DropdownInput'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import { TEMP_groupadmin } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GroupMemberTable } from './GroupMemberTable'
import { Trash2Icon } from 'lucide-react'
import EmployeeListModal from './EmployeeListModal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const GroupForm: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)

    const navigate = useNavigate()

    const groupForm = useForm<CreateGroupType>({
        mode: 'onChange',
        resolver: zodResolver(groupSchema),
    })

    const {
        handleSubmit,
        formState: { errors },
    } = groupForm

    const onSubmit = (data: CreateGroupType) => {
        console.log(data)
    }

    return (
        <Form {...groupForm}>
            <form
                autoComplete='on'
                noValidate
                className='w-full h-full max-w-[80%]'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-row gap-5'>
                    <div className='w-1/2'>
                        <FormField
                            control={groupForm.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className='mt-[16px] w-[100%] bg-white'
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

                <div className='flex flex-row items-center justify-between mt-5'>
                    <div className='w-[30rem]'>
                        <Dropdown options={TEMP_groupadmin} />
                    </div>
                    <div className='flex flex-row gap-5'>
                        <Button variant='outline' className='flex flex-row gap-2'>
                            Remove
                            <Trash2Icon className='w-5' />
                        </Button>
                        <Button
                            onClick={() => setOpen(true)}
                            variant='outline'
                            className='flex flex-row gap-2'
                        >
                            Add Employee
                        </Button>
                    </div>
                </div>

                <div className='mt-5'>
                    <GroupMemberTable />
                </div>

                <div className='flex flex-row gap-5 items-center justify-end mt-5'>
                    <Button type='button' variant='outline' onClick={() => navigate('/group/list')}>
                        Cancel
                    </Button>
                    <Button type='submit'>Create Group</Button>
                </div>
            </form>
            <EmployeeListModal open={open} setOpen={setOpen} />
        </Form>
    )
}
