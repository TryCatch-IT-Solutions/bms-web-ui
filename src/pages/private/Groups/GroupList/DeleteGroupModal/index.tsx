import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { toast } from '@/hooks/useToast'
import { useAtom } from 'jotai'
import { groupsToDeleteAtom } from '@/store/groups'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeleteGroupType } from '@/api/group/schema'
import { removeGroup } from '@/api/group'

interface DeleteGroupModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteGroupModal: React.FC<DeleteGroupModalProps> = ({ open, setOpen }) => {
    const [groupsToRemove, setGroupsToRemove] = useAtom(groupsToDeleteAtom)

    const queryClient = useQueryClient()

    const { mutate: removeGroupsMu } = useMutation<unknown, unknown, DeleteGroupType>({
        mutationFn: removeGroup,
        onSuccess: () => {
            toast({
                description: 'Accounts Deleted Successfully',
                variant: 'default',
            })

            queryClient.invalidateQueries({ queryKey: ['groupList'] })

            setOpen(false)

            setGroupsToRemove(null)
        },
    })

    const handleSave = () => {
        console.log('here')
        removeGroupsMu(groupsToRemove as DeleteGroupType)
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
            <div className=''>
                <div className='flex gap-5 px-10'>
                    <div className='flex justify-center items-center bg-zentive-red-light h-16 w-16 rounded-full'>
                        <HiOutlineExclamationTriangle className='yx-5 text-red-500 h-10 w-10' />
                    </div>
                    <div className=' overflow-auto'>
                        <h1 className='text-left font-semibold text-2xl text-gray-900 mt-2.5'>
                            Delete Groups
                        </h1>
                        <p className='text-left text-sm text-gray-500 mt-5'>
                            This action cannot be undone, employees under this deleted groups will
                            be unassigned.
                        </p>
                        <p className='text-left text-sm text-gray-500 mt-5'>
                            Are you sure you want to delete the selected groups?
                        </p>
                    </div>
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
                    >
                        Yes, please
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteGroupModal
