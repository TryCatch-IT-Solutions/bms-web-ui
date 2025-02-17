import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { Checkbox } from '@/components/Checkbox'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUsers } from '@/api/profile'
import { EMAIL_CONFLICT_LABEL, ROLE, TIME_DATE_FORMAT } from '@/constants'
import { PaginationType } from '@/components/Pagination/schema'
import { Pagination } from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import { MergeConflictingAccountType } from '@/api/group/schema'
import { AxiosError } from 'axios'
import { mergeConflictingUser } from '@/api/group'
import { useToast } from '@/hooks/useToast'
import { ProfileType } from '@/api/profile/schema'
import dayjs from 'dayjs'

interface EmployeeListModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    profile: ProfileType | null
}

const EmployeeListModal: React.FC<EmployeeListModalProps> = ({ open, setOpen, profile }) => {
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const { toast } = useToast()
    const queryClient = useQueryClient()

    const [empId, setEmpId] = useState<number | null>(null)

    const handleCheckboxChange = (id: number) => {
        setEmpId(id)
    }

    const { mutate: mergeConfictingUserMu, isPending } = useMutation<
        unknown,
        AxiosError,
        MergeConflictingAccountType
    >({
        mutationFn: mergeConflictingUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editGroup'] })
            queryClient.invalidateQueries({ queryKey: ['groupEditemployeeList'] })
            toast({
                description: 'Employee Accounts Merged Successfully',
            })
        },
    })

    const handleSave = () => {
        mergeConfictingUserMu({ id: profile?.id ?? 0, merge_to: empId ?? 0 })
        setOpen(false)
    }

    const { data: employees, isLoading } = useQuery({
        queryKey: ['mergeEmployeeAccounts', pagination],
        queryFn: () =>
            getUsers(
                pagination,
                ['active'],
                [ROLE.employee],
                true,
                profile?.email?.replace(EMAIL_CONFLICT_LABEL, '') ?? null,
                'email',
            ),
        enabled: open,
    })

    useEffect(() => {
        setEmpId(null)
    }, [open])

    return (
        <Modal
            isOpen={open}
            isHideCloseButton
            onClose={() => {
                setOpen(false)
            }}
            title=''
            titleClassName=''
            containerClassName='max-w-[600px]'
        >
            <div className='flex flex-col gap-5'>
                <div className='flex gap-5 px-10'>
                    <h1 className='text-left font-semibold text-2xl text-gray-900 mt-2.5'>
                        Select an account to merge
                    </h1>
                </div>

                <div className='overflow-y-auto px-10 max-h-[15rem]'>
                    {isLoading ? (
                        <Spinner variant='normal' className='h-10 w-10' />
                    ) : (
                        <ul className='flex flex-col gap-3'>
                            {employees?.content?.map((emp) => (
                                <li
                                    className='flex flex-row gap-5 items-center border border-y-1 border-x-0 py-2'
                                    key={emp.id}
                                >
                                    <Checkbox
                                        checked={empId === emp.id}
                                        onClick={() => handleCheckboxChange(emp.id)}
                                    />
                                    <span className='flex flex-col gap-2'>
                                        <p>
                                            Name: {emp.first_name} {emp.last_name}
                                        </p>
                                        <p>Email: {emp.email}</p>
                                        <p>Contact Number: {emp.phone_number}</p>
                                        <p>
                                            Created At:{' '}
                                            {dayjs(emp.createdAt).format(
                                                TIME_DATE_FORMAT.DATE_TIME,
                                            )}
                                        </p>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='mr-5'>
                    <Pagination
                        pagination={pagination}
                        setPagination={setPagination}
                        total={employees?.meta.total ?? 0}
                        per_page={pagination.per_page ?? 10}
                    />
                </div>

                <div className='mt-6 flex justify-end gap-x-4 bg-gray-300 py-6 px-6'>
                    <Button
                        variant='ghost'
                        className='w-97 h-11 text-base font-semibold bg-white text-bms-primary ring-bms-primary border border-bms-primary'
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className='w-97 h-11 text-base font-semibold bg-bms-primary'
                        type='button'
                        disabled={isPending || empId === 0 || empId === null || empId === undefined}
                    >
                        Merge
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EmployeeListModal
