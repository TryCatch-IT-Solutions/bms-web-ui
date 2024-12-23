import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import SearchBar from '@/components/SearchBar'
import { Checkbox } from '@/components/Checkbox'
import { useQuery } from '@tanstack/react-query'
import { PaginationType } from '@/components/Pagination/schema'
import { Pagination } from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import { useFormContext } from 'react-hook-form'
import { getGroups } from '@/api/group'
import { CreateDeviceType } from '@/api/device/schema'
import { GroupType } from '@/api/group/schema'
import { useSetAtom } from 'jotai'
import { createDeviceGroupAtom } from '@/store/device'

interface GroupListModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const GroupListModal: React.FC<GroupListModalProps> = ({ open, setOpen }) => {
    const [groupId, setGroupId] = useState<number>(0)
    const [groupProfile, setGroupProfile] = useState<GroupType | null>(null)
    const setDeviceGroupAtom = useSetAtom(createDeviceGroupAtom)

    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 20,
        itemsPerPage: 20,
    })

    const { setValue } = useFormContext<CreateDeviceType>()

    const handleSave = () => {
        setDeviceGroupAtom(groupProfile)
        setValue('group_id', groupId as number)
        setOpen(false)
    }

    const { data: groups, isLoading } = useQuery({
        queryKey: ['groupListCreateDeviceList', pagination],
        queryFn: () => getGroups(pagination),
    })

    const handleCheckClick = (g: GroupType) => {
        setGroupId(g.id)
        setGroupProfile(g)
    }

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
                        Select Group Admin
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
                            {groups?.content?.map((g) => (
                                <li className='flex flex-row gap-2 items-center'>
                                    <Checkbox
                                        checked={groupId === g.id}
                                        onClick={() => handleCheckClick(g)}
                                    />
                                    {g.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    total={groups?.meta.total ?? 0}
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
                        Add
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default GroupListModal
