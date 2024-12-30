import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { toast } from '@/hooks/useToast'
import { useAtom } from 'jotai'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteDeviceAtom } from '@/store/device'
import { deleteDevices } from '@/api/device'
import { DeleteDeviceType } from '@/api/device/schema'

interface DeleteDeviceModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteDeviceModal: React.FC<DeleteDeviceModalProps> = ({ open, setOpen }) => {
    const [devicesToDelete, setDevicesToDelete] = useAtom(deleteDeviceAtom)
    const [disabled, setDisabled] = useState<boolean>(false)

    const queryClient = useQueryClient()

    const { mutate: deleteUsersMu } = useMutation({
        mutationFn: () => deleteDevices(devicesToDelete as DeleteDeviceType),
        onSuccess: () => {
            toast({
                description: 'Accounts Deleted Successfully',
                variant: 'default',
            })

            queryClient.invalidateQueries({ queryKey: ['deviceList'] })
            setDevicesToDelete(null)
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
                            Delete Devices
                        </h1>
                        <p className='text-left text-sm text-gray-500 mt-5'>
                            If the device assigned to a group is deleted or deactivated, employees
                            within that group will no longer be able to log in.
                        </p>
                        <p className='text-left text-sm text-gray-500 mt-5'>
                            Are you sure you want to delete these devices?
                        </p>
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
                        disabled={disabled}
                    >
                        Yes, please
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteDeviceModal
