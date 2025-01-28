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
import { CreateGroupType } from '@/api/group/schema'
import { useFormContext } from 'react-hook-form'
import { ProfileType } from '@/api/profile/schema'

interface AdminListModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const AdminListModal: React.FC<AdminListModalProps> = ({ open, setOpen }) => {
    const [adminId, setAdminId] = useState<number>(0)
    const [adminProfile, setAdminProfile] = useState<ProfileType | null>(null)
    const [searchVal, setSearchVal] = useState<string>('')

    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const { setValue } = useFormContext<CreateGroupType>()

    const handleSave = () => {
        setValue('admin_profile', adminProfile as ProfileType)
        setValue('group_admin', adminId as number)
        setOpen(false)
    }

    const { data: employees, isLoading } = useQuery({
        queryKey: ['groupEditgroupAdminList', pagination, searchVal],
        queryFn: () => getUsers(pagination, ['active'], [ROLE.groupadmin], true, searchVal),
    })

    const handleCheckClick = (e: ProfileType) => {
        setAdminId(e.id)
        setAdminProfile(e)
    }

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
                    <h1 className='text-left font-semibold text-2xl text-gray-900 mt-2.5'>
                        Select Group Admin
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
                            {employees?.content?.map((e) => (
                                <li className='flex flex-row gap-2 items-center'>
                                    <Checkbox
                                        checked={adminId === e.id}
                                        onClick={() => handleCheckClick(e)}
                                    />
                                    {e.first_name} {e.last_name}
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
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className='w-97 h-11 text-base font-semibold bg-bms-primary'
                        disabled={adminId === 0}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default AdminListModal
