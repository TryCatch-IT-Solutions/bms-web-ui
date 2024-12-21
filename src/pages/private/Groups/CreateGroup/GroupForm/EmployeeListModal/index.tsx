import { Dispatch, SetStateAction, useState } from 'react'
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

    const [empIds, setEmpIds] = useState<number[]>([])
    const [empProfiles, setEmpProfiles] = useState<ProfileType[]>([])

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
        queryKey: ['employeeList', pagination],
        queryFn: () => getUsers(pagination, ['active'], [ROLE.employee], true),
    })

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
                        Add Employee to Group
                    </h1>
                </div>

                <div className='px-10'>
                    <SearchBar
                        onSearchChange={(val) => console.log(val)}
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
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className='w-97 h-11 text-base font-semibold bg-bms-primary'
                    >
                        Add Employees
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EmployeeListModal
