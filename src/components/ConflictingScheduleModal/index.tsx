import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
} from '@/components/AlertDialog'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Dispatch, SetStateAction } from 'react'

interface RestoreModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ConflictingScheduleModal: React.FC<RestoreModalProps> = ({ setOpen, open }) => {
    return (
        <AlertDialog onOpenChange={(o) => setOpen(o)} open={open}>
            <AlertDialogContent className='bg-white h-[285px] w-[577px] rounded-[15px] p-0'>
                <div className='flex gap-5 px-6 pt-10'>
                    <div className='flex justify-center items-center bg-zentive-red-light h-16 w-16 rounded-full'>
                        <HiOutlineExclamationTriangle className='h-6 w-6 mx-5  yx-5 text-red-500' />
                    </div>
                    <div className=' overflow-auto'>
                        <AlertDialogTitle className='text-left font-semibold text-2xl text-gray-900 mt-2.5'>
                            Crew Assignment Conflict
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-left text-sm text-gray-500 mt-5'>
                            Crew cannot be assigned due to a scheduling conflict. They are already
                            booked for another job on the conflicting date.
                        </AlertDialogDescription>
                    </div>
                </div>
                <AlertDialogFooter className='mx-0 bg-gray-100 rounded-b-[15px] pr-6 pb-4 pt-1.5'>
                    <div className='w-full flex justify-end items-end gap-4'>
                        <AlertDialogAction
                            onClick={() => {
                                setOpen(false)
                            }}
                            className='w-97 h-11 text-base font-semibold bg-zentive-green-dark hover:bg-zentive-green-dark/90'
                        >
                            Got it, thanks
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConflictingScheduleModal
