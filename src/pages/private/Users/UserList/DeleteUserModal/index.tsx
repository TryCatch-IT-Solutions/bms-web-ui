import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { toast } from '@/hooks/useToast'
import { useAtom, useAtomValue } from 'jotai'
import { userIdsToDeleteAtom, userSelectedStatusAtom } from '@/store/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bulkArchiveUserStatus, bulkRestoreUserStatus } from '@/api/profile'
import { BulkUserUpdateStatusType } from '@/api/profile/schema'
import { USER_STATUS } from '@/constants'

interface DeleteUserModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ open, setOpen }) => {
    const [userIdsToDelete, setUserIdsToDelete] = useAtom(userIdsToDeleteAtom)
    const [disabled, setDisabled] = useState<boolean>(false)
    const selectedUserStatus = useAtomValue(userSelectedStatusAtom)

    const queryClient = useQueryClient()

    const { mutate: deleteUsersMu, isPending: deletePending } = useMutation({
        mutationFn: () => bulkArchiveUserStatus(userIdsToDelete as BulkUserUpdateStatusType),
        onSuccess: () => {
            toast({
                description: 'Accounts Deleted Successfully',
                variant: 'default',
            })

            queryClient.invalidateQueries({ queryKey: ['usersList'] })
            queryClient.invalidateQueries({ queryKey: ['archivedUsersCount'] })
            queryClient.invalidateQueries({ queryKey: ['assignedUsersCount'] })
            queryClient.invalidateQueries({ queryKey: ['unassignedUsersCount'] })
            setUserIdsToDelete(null)
            setOpen(false)
        },
        onError: (err: any) => {
            toast({
                description: err?.response?.data?.errors,
                variant: 'destructive',
            })

            setOpen(false)
        },
    })

    const { mutate: restoreUsersMu, isPending: restorePending } = useMutation({
        mutationFn: () => bulkRestoreUserStatus(userIdsToDelete as BulkUserUpdateStatusType),
        onSuccess: () => {
            toast({
                description: 'Accounts Restored Successfully',
                variant: 'default',
            })

            queryClient.invalidateQueries({ queryKey: ['usersList'] })
            queryClient.invalidateQueries({ queryKey: ['archivedUsersCount'] })
            queryClient.invalidateQueries({ queryKey: ['assignedUsersCount'] })
            queryClient.invalidateQueries({ queryKey: ['unassignedUsersCount'] })
            setUserIdsToDelete(null)
            setOpen(false)
        },
        onError: (err: any) => {
            toast({
                description: err?.response?.data?.errors,
                variant: 'destructive',
            })

            setOpen(false)
        },
    })

    const handleSubmit = () => {
        setDisabled(true)
        if (selectedUserStatus === USER_STATUS.ACTIVATED) {
            deleteUsersMu()
        } else {
            restoreUsersMu()
        }
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
                <div className='flex xs:flex-col gap-5 xs:items-center xs:justify-center px-10'>
                    <div className='flex justify-center items-center bg-zentive-red-light h-16 xs:h-5 w-16 rounded-full'>
                        <HiOutlineExclamationTriangle className='yx-5 text-red-500 h-10 w-10' />
                    </div>
                    <div className='overflow-auto xs:items-center xs:justify-center'>
                        {selectedUserStatus === USER_STATUS.ACTIVATED ? (
                            <div className='text-left xs:text-center xs:flex xs:flex-col xs:items-center xs:justify-center'>
                                <h1 className='font-semibold text-2xl xs:text-lg text-gray-900 mt-2.5'>
                                    Delete User Accounts
                                </h1>
                                <p className='text-sm text-gray-500 xs:text-sm mt-5'>
                                    Deleted user accounts will lose their login capability, you can
                                    recover the selected accounts on the deleted tab of this table.
                                </p>
                                <p className='text-sm text-gray-500 xs:text-sm mt-5'>
                                    Are you sure you want to delete these accounts?
                                </p>
                            </div>
                        ) : (
                            <div className='text-left xs:text-center xs:flex xs:flex-col xs:items-center xs:justify-center'>
                                <h1 className='font-semibold text-2xl xs:text-lg text-gray-900 mt-2.5'>
                                    Restore User Accounts
                                </h1>
                                <p className='text-sm text-gray-500 xs:text-sm mt-5'>
                                    Rstored user accounts will regain their login capability.
                                </p>
                                <p className='text-sm text-gray-500 xs:text-sm mt-5'>
                                    Are you sure you want to restore these accounts?
                                </p>
                            </div>
                        )}
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
                        disabled={disabled || deletePending || restorePending}
                    >
                        Yes, please
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteUserModal
