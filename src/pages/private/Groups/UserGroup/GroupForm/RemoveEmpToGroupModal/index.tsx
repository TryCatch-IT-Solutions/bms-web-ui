import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { toast } from '@/hooks/useToast'
import { useAtom } from 'jotai'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeeGroupToRemoveAtom } from '@/store/groups'
import { AddEmpToGroupType } from '@/api/group/schema'
import { removeGroupEmployee } from '@/api/group'

interface DeleteUserModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    groupId: number
}

const RemoveEmpToGroupModal: React.FC<DeleteUserModalProps> = ({ open, setOpen, groupId }) => {
    const [userIdsToDelete, setUserIdsToDelete] = useAtom(employeeGroupToRemoveAtom)
    const [disabled, setDisabled] = useState<boolean>(false)

    const queryClient = useQueryClient()

    const { mutate: deleteUsersMu } = useMutation({
        mutationFn: () => removeGroupEmployee(userIdsToDelete as AddEmpToGroupType, groupId),
        onSuccess: () => {
            toast({
                description: 'Employees Removed Successfully',
                variant: 'default',
            })

            queryClient.invalidateQueries({ queryKey: ['editGroup'] })
            setUserIdsToDelete(null)
            setOpen(false)
        },
    })

    const handleSubmit = () => {
        setDisabled(true)
        deleteUsersMu()
        setDisabled(false)
    }

    return (
        <Modal
            isOpen={open}
            isHideCloseButton
            onClose={() => setOpen(false)}
            title=''
            titleClassName=''
            containerClassName='max-w-[600px]'
        >
            <div>
                <div className='flex gap-5 px-10'>
                    <div className='flex justify-center items-center bg-zentive-red-light h-16 w-16 rounded-full'>
                        <HiOutlineExclamationTriangle className='yx-5 text-red-500 h-10 w-10' />
                    </div>
                    <div className=' overflow-auto'>
                        <>
                            <h1 className='text-left font-semibold text-2xl text-gray-900 mt-2.5'>
                                Remove Employees
                            </h1>
                            <p className='text-left text-sm text-gray-500 mt-5'>
                                Deleted Employee will be removed from the selected group.
                            </p>
                            <p className='text-left text-sm text-gray-500 mt-5'>
                                Are you sure you want to remove these employees?
                            </p>
                        </>
                    </div>
                </div>
                <div className='mt-6 flex justify-end gap-x-4 bg-gray-300 py-6 px-6'>
                    <Button
                        variant='ghost'
                        className='w-97 h-11 text-base font-semibold bg-white text-bms-primary ring-bms-primary border border-bms-primary'
                        onClick={() => setOpen(false)}
                        disabled={disabled}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className='w-97 h-11 text-base font-semibold bg-bms-primary'
                        type='button'
                        disabled={disabled}
                    >
                        Yes, please
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default RemoveEmpToGroupModal
