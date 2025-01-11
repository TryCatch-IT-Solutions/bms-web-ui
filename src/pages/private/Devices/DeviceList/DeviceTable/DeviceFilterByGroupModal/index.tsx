import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import SearchBar from '@/components/SearchBar'
import { Checkbox } from '@/components/Checkbox'
import { useQuery } from '@tanstack/react-query'
import { PaginationType } from '@/components/Pagination/schema'
import { Pagination } from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import { getGroups } from '@/api/group'
import { GroupType } from '@/api/group/schema'
import { useAtom } from 'jotai'
import { groupFilterAtom } from '@/store/device'

interface GroupListModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const DeviceFilterByGroupModal: React.FC<GroupListModalProps> = ({ open, setOpen }) => {
    const [groupId, setGroupId] = useState<number | null>(null)
    const [groupProfile, setGroupProfile] = useState<number | null>(null)
    const [groupIdAtom, setDeviceGroupAtom] = useAtom(groupFilterAtom)
    const [searchVal, setSearchVal] = useState<string>('')

    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 20,
        itemsPerPage: 20,
    })

    const handleSave = () => {
        setDeviceGroupAtom(groupProfile)
        setOpen(false)
    }

    const { data: groups, isLoading } = useQuery({
        queryKey: ['groupListCreateDeviceList', pagination, searchVal],
        queryFn: () => getGroups(pagination, searchVal),
    })

    const handleCheckClick = (g: GroupType) => {
        if (groupId === g.id) {
            setGroupId(null)
            setGroupProfile(null)
        } else {
            setGroupId(g.id)
            setGroupProfile(g.id)
        }
    }

    useEffect(() => {
        setGroupId(groupIdAtom)
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
                        Select Group Admin
                    </h1>
                </div>

                <div className='px-10'>
                    <SearchBar
                        onSearchChange={(e) => setSearchVal(e?.target?.value)}
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
                        Submit
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
