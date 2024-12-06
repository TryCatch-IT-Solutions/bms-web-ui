import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from '@/components/AlertDialog'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '../Button'
import featureRestriction from '@/assets/private/feature-restriction.svg'
import { useNavigate } from 'react-router-dom'

interface OwnerJobModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const FeatureRestrictionModal: React.FC<OwnerJobModalProps> = ({ setOpen, open }) => {
    const navigate = useNavigate()

    return (
        <AlertDialog onOpenChange={(o) => setOpen(o)} open={open}>
            <AlertDialogContent className='flex w-fit bg-zentive-green-darker w-[40.75rem] h-[24rem] rounded-[15px] p-0'>
                <div className='flex flex-row items-center gap-5 p-8'>
                    <div className='flex flex-col overflow-auto gap-4'>
                        <AlertDialogTitle className='text-center font-semibold text-2xl text-white'>
                            Unlock More with an Upgrade!
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-center text-sm text-white'>
                            Upgrade your plan to access this feature and get the most out of our
                            service.
                        </AlertDialogDescription>
                        <div className='flex items-center justify-center'>
                            <div className='flex flex-col gap-2 w-[45%] '>
                                <Button onClick={() => navigate('/owner-subscription/change-plan')}>
                                    Upgrade Now
                                </Button>
                                <Button
                                    onClick={() => setOpen(false)}
                                    variant='link'
                                    className='text-white underline'
                                >
                                    Upgrade Later
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

export default FeatureRestrictionModal
