import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
} from '@/components/AlertDialog'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

interface ActivateModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ExistingPhoneNumberModal: React.FC<ActivateModalProps> = ({ open, setOpen }) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='bg-white h-[285px] w-[577px] rounded-[15px] p-0'>
                <div className='flex gap-5 px-[26.5px] pt-[40px]'>
                    <div className='flex justify-center items-center bg-zentive-red-light h-[62px] w-[62px] rounded-full'>
                        <HiOutlineExclamationTriangle className='h-[26px] w-[26px] mx-[17px]  yx-[17px] text-zentive-red-dark' />
                    </div>
                    <div className=' overflow-auto'>
                        <AlertDialogTitle className='text-left font-semibold text-[24px] text-[#191A0A] mt-[10px]'>
                            Unable to Reactivate Account
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-left text-[14px] text-zentive-gray-medium mt-[18px]'>
                            Phone number already exists
                        </AlertDialogDescription>
                    </div>
                </div>
                <AlertDialogFooter className='mx-[0px] bg-[#EBEBEB] rounded-b-[15px] pb-[15px] pt-[6px]'>
                    <div className='w-full flex justify-center items-center gap-[16px]'>
                        <AlertDialogCancel
                            onClick={() => setOpen(false)}
                            className='w-[155px] h-[43px] text-[16px] font-semibold text-zentive-green-dark ring-zentive-green-dark'
                        >
                            Got It
                        </AlertDialogCancel>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ExistingPhoneNumberModal
