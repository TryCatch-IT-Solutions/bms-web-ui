import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import SearchBar from '@/components/SearchBar'
import { Checkbox } from '@/components/Checkbox'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllUsers, getUsers } from '@/api/profile'
import { ROLE, USER_SEARCH_TYPE_OPTIONS } from '@/constants'
import { PaginationType } from '@/components/Pagination/schema'
import { Pagination } from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import { ProfileType } from '@/api/profile/schema'
import { AddEmpToGroupType } from '@/api/group/schema'
import { AxiosError } from 'axios'
import { addGroupEmployee } from '@/api/group'
import { useParams } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'
import { SearchBarDropdown } from '@/components/SearchbarDropdown'

interface EmployeeListModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const EmployeeListModal: React.FC<EmployeeListModalProps> = ({ open, setOpen }) => {
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const { toast } = useToast()
    const queryClient = useQueryClient()
    const [selectAll, setSelectAll] = useState<boolean>(false)

    const { id } = useParams()

    const [empIds, setEmpIds] = useState<AddEmpToGroupType>({ employees: [] })
    const [searchVal, setSearchVal] = useState<string>('')
    const [searchType, setSearchType] = useState<string>('full_name')

    const { data: allEmps } = useQuery({
        queryKey: ['mergeEmployeeAccounts', { current_page: 1, per_page: 10 }],
        queryFn: () =>
            getAllUsers(
                { current_page: 1, per_page: 10 },
                ['active'],
                [ROLE.employee],
                true,
                null,
                'email',
            ),
    })

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectAll(true)
            const allEmpIds = allEmps?.content?.map((emp) => emp.id) || []
            setEmpIds({ employees: allEmpIds })
        } else {
            setSelectAll(false)
            setEmpIds({ employees: [] })
        }
    }

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

    const { mutate: addEmpToGroupMu, isPending } = useMutation<
        unknown,
        AxiosError,
        AddEmpToGroupType
    >({
        mutationFn: (data) => addGroupEmployee(data, Number(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editGroup'] })
            queryClient.invalidateQueries({ queryKey: ['groupEditemployeeList'] })
            toast({
                description: 'Employees Added Successfully',
            })
        },
    })

    const handleSave = () => {
        addEmpToGroupMu(empIds)
        setOpen(false)
    }

    const { data: employees, isLoading } = useQuery({
        queryKey: ['groupEditemployeeList', pagination, searchVal],
        queryFn: () =>
            getUsers(pagination, ['active'], [ROLE.employee], true, searchVal, searchType),
    })

    useEffect(() => {
        setSearchVal('')
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
                <div className='flex flex-col gap-5 px-10'>
                    <h1 className='text-left font-semibold text-2xl text-gray-900 mt-2.5'>
                        Assign Employee(s) to Group
                    </h1>
                    <p>You can assign up to 5,000 employees to a group at once.</p>
                </div>

                <div className='px-10 flex flex-row gap-3'>
                    <SearchBar
                        onSearchChange={(e) => {
                            setTimeout(() => {
                                setSearchVal(e?.target?.value)
                            }, 500)
                        }}
                        placeHolder='Search Employee'
                    />
                    <SearchBarDropdown
                        options={USER_SEARCH_TYPE_OPTIONS}
                        onChange={(e) => setSearchType(e)}
                        value={searchType ?? ''}
                    />
                    <span className='flex flex-row items-center gap-2'>
                        <Checkbox
                            checked={selectAll}
                            onCheckedChange={() => handleSelectAll(!selectAll)}
                        />
                        <span>Select All</span>
                    </span>
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
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className='w-97 h-11 text-base font-semibold bg-bms-primary'
                        type='button'
                        disabled={isPending || empIds?.employees?.length === 0}
                    >
                        Assign Employee(s)
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EmployeeListModal
