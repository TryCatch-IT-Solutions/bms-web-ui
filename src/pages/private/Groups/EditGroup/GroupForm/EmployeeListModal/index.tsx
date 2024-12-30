import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import SearchBar from '@/components/SearchBar'
import { Checkbox } from '@/components/Checkbox'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUsers } from '@/api/profile'
import { ROLE } from '@/constants'
import { PaginationType } from '@/components/Pagination/schema'
import { Pagination } from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import { ProfileType } from '@/api/profile/schema'
import { AddEmpToGroupType } from '@/api/group/schema'
import { AxiosError } from 'axios'
import { addGroupEmployee } from '@/api/group'
import { useParams } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'

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

    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { id } = useParams()

    const [empIds, setEmpIds] = useState<AddEmpToGroupType>({ employees: [] })

    const handleCheckboxChange = (emp: ProfileType, checked: boolean) => {
        setEmpIds((prev) => {
            if (!prev) {
                return { employees: checked ? [emp.id] : [] } // Handle initial state
            }

            const updatedEmployees = checked
                ? [...prev.employees, emp.id]
                : prev.employees.filter((empId) => empId !== emp.id)

            return { ...prev, employees: updatedEmployees } // Return the correct structure
        })
    }

    const { mutate: addEmpToGroupMu } = useMutation<unknown, AxiosError, AddEmpToGroupType>({
        mutationFn: (data) => addGroupEmployee(data, Number(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editGroup'] })
            toast({
                description: 'Employees Added Successfully',
            })
        },
    })

    const handleSave = () => {
        console.log('here')
        addEmpToGroupMu(empIds)
        setOpen(false)
    }

    const { data: employees, isLoading } = useQuery({
        queryKey: ['employeeList', pagination],
        queryFn: () => getUsers(pagination, ['active'], [ROLE.employee], true, null),
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
                                        checked={empIds.employees.includes(emp.id)}
                                        onClick={() =>
                                            handleCheckboxChange(
                                                emp,
                                                !empIds?.employees.includes(emp.id),
                                            )
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
                        type='button'
                    >
                        Add Employees
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EmployeeListModal
