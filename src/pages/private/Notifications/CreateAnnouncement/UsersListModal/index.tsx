import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import SearchBar from '@/components/SearchBar'
import { Checkbox } from '@/components/Checkbox'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/profile'
import { ROLE, USER_SEARCH_TYPE_OPTIONS } from '@/constants'
import { PaginationType } from '@/components/Pagination/schema'
import { Pagination } from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import { useFormContext } from 'react-hook-form'
import { ProfileType } from '@/api/profile/schema'
import { SearchBarDropdown } from '@/components/SearchbarDropdown'
import { CreateAnnouncementType } from '@/api/announcements/schema'

interface EmployeeListModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const EmployeeListModal: React.FC<EmployeeListModalProps> = ({ open, setOpen }) => {
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const [searchVal, setSearchVal] = useState<string>('')
    const [empIds, setEmpIds] = useState<number>(0)
    const [searchType, setSearchType] = useState<string>('full_name')

    const { setValue } = useFormContext<CreateAnnouncementType>() // Ensure FormProvider is wrapping this component

    const handleCheckboxChange = (emp: ProfileType) => {
        setEmpIds(emp.id)
    }

    const handleSave = () => {
        setValue('user_id', empIds as number)
        setOpen(false)
    }

    const { data: employees, isLoading } = useQuery({
        queryKey: ['createGroupemployeeList', pagination, searchVal],
        queryFn: () =>
            getUsers(
                pagination,
                ['active'],
                [ROLE.employee, ROLE.groupadmin],
                null,
                searchVal,
                searchType,
            ),
    })

    useEffect(() => {
        setSearchVal('')
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
                    <h1 className='text-left font-semibold text-2xl xs:text-lg text-gray-900 mt-2.5'>
                        Assign Employee(s) to Group
                    </h1>
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
                </div>

                <div className='overflow-y-auto px-10 max-h-[10rem]'>
                    {isLoading ? (
                        <Spinner variant='normal' className='h-10 w-10' />
                    ) : (
                        <ul className='flex flex-col gap-3'>
                            {employees?.content?.map((emp) => (
                                <li className='flex flex-row gap-2 items-center' key={emp.id}>
                                    <Checkbox onClick={() => handleCheckboxChange(emp)} />
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
                        per_page={pagination?.per_page ?? 10}
                    />
                </div>

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
                        disabled={empIds === 0}
                    >
                        Assign Employee(s)
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EmployeeListModal
