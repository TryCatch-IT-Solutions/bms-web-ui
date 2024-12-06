import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from '@/components/AlertDialog'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

const AppModal = ({
    open,
    setOpen,
    children,
    title,
    description,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
    title?: string
    description?: string
}) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='bg-white h-[285px] w-[577px] rounded-[15px] p-0'>
                <div className='flex gap-5 px-[26.5px] pt-[40px]'>
                    <div className='flex justify-center items-center bg-zentive-red-light h-[62px] w-[62px] rounded-full'>
                        <HiOutlineExclamationTriangle className='h-[26px] w-[26px] mx-[17px]  yx-[17px] text-zentive-red-dark' />
                    </div>
                    <div className=' overflow-auto'>
                        <AlertDialogTitle className='text-left font-semibold text-2xl text-[#191A0A] mt-[10px]'>
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-left text-sm text-zentive-gray-medium mt-[18px]'>
                            {description}
                        </AlertDialogDescription>
                    </div>
                </div>
                {children}
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default AppModal
