import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from '@/components/AlertDialog'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '../Button'
import featureRestriction from '@/assets/private/feature-restriction.svg'

interface OwnerJobModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const FeatureRestrictionContactModal: React.FC<OwnerJobModalProps> = ({ setOpen, open }) => {

    return (
        <AlertDialog onOpenChange={(o) => setOpen(o)} open={open}>
            <AlertDialogContent className='flex w-fit bg-zentive-green-darker h-[24rem] rounded-[15px] p-0'>
                <div className='flex flex-row items-center gap-5 p-8'>
                    <div className='flex flex-col overflow-auto gap-4'>
                        <AlertDialogTitle className='text-center font-semibold text-2xl text-white'>
                            Need More Users?
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-center text-sm text-white w-100'>
                            Seems like you've already reached the maximum number of users in your app. For more information, please
                            contact us at support@zentive.io
                        </AlertDialogDescription>
                        <div className='flex items-center justify-center'>
                            <div className='flex flex-col gap-2 w-[45%] '>
                                <Button onClick={() => setOpen(false)}>
                                    Got It
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={featureRestriction} className='h-[17rem]' />
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FeatureRestrictionContactModal
