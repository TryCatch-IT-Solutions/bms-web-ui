import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

interface IDeleteProfileJobRestrictionModal {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    type: string
}

const DeleteProfileJobRestrictionModal: React.FC<IDeleteProfileJobRestrictionModal> = ({
    open,
    setOpen,
    type,
}) => {
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
                        <HiOutlineExclamationTriangle className='h-6 w-6 mx-5  yx-5 text-red-500' />
                    </div>
                    <div className=' overflow-auto'>
                        <h1 className='text-left font-semibold text-2xl text-gray-900 mt-2.5 capitalize'>
                            Cannot Deactivate {type}
                        </h1>
                        <p className='text-left text-sm text-gray-500 mt-5'>
                            Oops! We can't deactivate the {type} right now because they have scheduled
                            appointments.
                        </p>
                        {type === 'employee' ? (
                            <p className='text-left text-sm text-gray-500 mt-5'>
                                This {type} is currently assigned to an existing job schedule.
                            </p>
                        ) : (
                            <p className='text-left text-sm text-gray-500 mt-5'>
                                Please clear all their appointments before attempting to deactivate.
                                Thank you for your cooperation!
                            </p>
                        )}
                    </div>
                </div>
                <div className='mt-6 flex justify-end gap-x-4 bg-zentive-gray-light py-6 px-6'>
                    <Button
                        onClick={() => setOpen(false)}
                        className='w-97 h-11 text-base font-semibold bg-zentive-green-dark hover:bg-zentive-green-medium cursor-pointer'
                    >
                        Got it, Thanks
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteProfileJobRestrictionModal
