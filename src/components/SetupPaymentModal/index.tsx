import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
} from '@/components/AlertDialog'
import { useAtom } from 'jotai'
import { isSetupPaymentOpenAtom } from '@/store/subscription'
import { FC } from 'react'
import {} from '@radix-ui/react-icons'
import { Button } from '../Button'
import { useAppNavigate } from '@/hooks/useAppNavigate'
import warning from '@/assets/public/warning_icon.svg'

const SetupPaymentModal: FC = () => {
    const [open, onOpenChange] = useAtom(isSetupPaymentOpenAtom)

    const { navigateTo } = useAppNavigate()

    return (
        <AlertDialog onOpenChange={onOpenChange} open={open}>
            <AlertDialogContent className='bg-white h-[285px] w-[577px] rounded-[15px] p-0'>
                <div className='px-6 pt-5'>
                    <div className='flex flex-row gap-4 items-center'>
                        <div className='flex justify-center items-center h-16 w-16 rounded-full bg-red-100'>
                            <img
                                src={warning}
                                alt='Warning Png'
                                className='h-[25.84px] w-[28.26px]'
                            />
                        </div>
                        <AlertDialogTitle className='text-left font-semibold text-2xl text-zentive-black'>
                            Missing Payment Details
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className='ml-20 text-left text-sm text-gray-500 my-5'>
                        Looks like you haven't set up your payment details yet. <br /> <br /> To
                        subscribe to our paid plan and unlock all the amazing features, you'll need
                        to provide a valid payment method.
                    </AlertDialogDescription>
                </div>
                <AlertDialogFooter className='mx-0 bg-gray-100 rounded-b-[15px] p-6'>
                    <div className='w-full flex justify-end items-end gap-4'>
                        <Button
                            className='h-11 font-semibold'
                            onClick={() => onOpenChange(false)}
                            type='button'
                            variant='outline'
                        >
                            Cancel
                        </Button>
                        <Button
                            className='h-11'
                            onClick={() => navigateTo('/owner-subscription/change-card')}
                            type='button'
                        >
                            Set up Payment Details
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SetupPaymentModal
