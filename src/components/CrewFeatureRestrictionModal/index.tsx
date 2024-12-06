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

const CrewFeatureRestrictionModal: React.FC<OwnerJobModalProps> = ({ setOpen, open }) => {
    return (
        <AlertDialog onOpenChange={(o: boolean) => setOpen(o)} open={open}>
            <AlertDialogContent className='flex items-center justify-center bg-zentive-green-darker w-[80%] h-[30rem] rounded-[15px] p-0'>
                <div className='flex flex-col items-center gap-10 p-7'>
                    <div>
                        <img src={featureRestriction} className='h-[6rem] mt-5' />
                    </div>
                    <div>
                        <AlertDialogTitle className='text-center font-semibold text-lg text-white'>
                            {'Unlock More with an Upgrade!'}
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-center text-sm text-white mt-3'>
                            {'Upgrade your plan to access this feature and get the most out of our service.'}
                        </AlertDialogDescription>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='flex flex-col gap-5 w-[100%] '>
                            <Button onClick={() => setOpen(false)}>{'Got it thanks!'}</Button>
                        </div>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CrewFeatureRestrictionModal
