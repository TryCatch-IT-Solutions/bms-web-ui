import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import SearchBar from '@/components/SearchBar'
import { Checkbox } from '@/components/Checkbox'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/profile'
import { ROLE } from '@/constants'
import { PaginationType } from '@/components/Pagination/schema'
import { Pagination } from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import { useFormContext } from 'react-hook-form'
import { ProfileType } from '@/api/profile/schema'
import { CreateGroupType } from '@/api/group/schema'

interface EmployeeListModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const EmployeeListModal: React.FC<EmployeeListModalProps> = ({ open, setOpen }) => {
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 20,
        itemsPerPage: 20,
    })

    const [searchVal, setSearchVal] = useState<string>('')
    const [empIds, setEmpIds] = useState<number[]>([])
    const [empProfiles, setEmpProfiles] = useState<ProfileType[]>([])

    const { watch } = useFormContext<CreateGroupType>()

    const emps = watch('employee_profiles') // Array of employee profiles

    const { setValue } = useFormContext()

    const handleCheckboxChange = (emp: ProfileType, checked: boolean) => {
        setEmpIds((prev) =>
            checked ? [...prev, emp.id] : prev.filter((empId) => empId !== emp.id),
        )
        setEmpProfiles((prev) => (checked ? [...prev, emp] : prev.filter((emp) => emp !== emp)))
    }

    const handleSave = () => {
        setValue('employees', empIds as number[])
        setValue('employee_profiles', empProfiles as ProfileType[])
        setOpen(false)
    }

    const { data: employees, isLoading } = useQuery({
        queryKey: ['createGroupemployeeList', pagination, searchVal],
        queryFn: () => getUsers(pagination, ['active'], [ROLE.employee], true, searchVal),
        select: (data) => {
            return {
                content: data?.content?.filter((emp) => !emps?.some((e) => e.id === emp.id)),
                meta: data?.meta,
            }
        },
    })

    useEffect(() => {
        setSearchVal('')
        setEmpIds((prev) => prev.filter((id) => emps?.some((emp) => emp.id === id)))
        setEmpProfiles((prev) => prev.filter((emp) => emps?.some((e) => e.id === emp.id)))
    }, [open])

    return (
        <Modal
            isOpen={open}
            isHideCloseButton
            onClose={() => {
                console.log('close')
            }}
            title=''
            titleClassName=''
            containerClassName='max-w-[600px]'
        >
            <div className='flex flex-col gap-5'>
                <div className='flex gap-5 px-10'>
                    <h1 className='text-left font-semibold text-2xl text-gray-900 mt-2.5'>
                        Add Employee to Group
                    </h1>
                </div>

                <div className='px-10'>
                    <SearchBar
                        onSearchChange={(e) => {
                            setTimeout(() => {
                                setSearchVal(e?.target?.value)
                            }, 500)
                        }}
                        placeHolder='Search Employee'
                    />
                </div>

                <div className='overflow-y-auto px-10 max-h-[10rem]'>
                    {isLoading ? (
                        <Spinner variant='normal' className='h-10 w-10' />
                    ) : (
                        <ul className='flex flex-col gap-3'>
                            {employees?.content?.map((emp) => (
                                <li className='flex flex-row gap-2 items-center' key={emp.id}>
                                    <Checkbox
                                        checked={empIds.includes(emp.id)}
                                        onClick={() =>
                                            handleCheckboxChange(emp, !empIds?.includes(emp.id))
                                        }
                                    />
                                    {emp.first_name} {emp.last_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    total={employees?.meta.total ?? 0}
                    per_page={20}
                />

                <div className='mt-6 flex justify-end gap-x-4 bg-gray-300 py-6 px-6'>
                    <Button
                        variant='ghost'
                        className='w-97 h-11 text-base font-semibold bg-white text-bms-primary ring-bms-primary border border-bms-primary'
                        onClick={() => setOpen(false)}
                        type='button'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className='w-97 h-11 text-base font-semibold bg-bms-primary'
                        type='button'
                        disabled={empIds?.length === 0}
                    >
                        Add Employees
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EmployeeListModal
