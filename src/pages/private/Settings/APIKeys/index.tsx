import { BreadCrumbs } from '@/components/BreadCrumbs'
import { EmailForm } from './EmailForm'
import { SMSForm } from './SMSForm'
import { MapsForm } from './MapsForm'
import { AndroidForm } from './AndroidForm'
import { SnapshotRetentionForm } from './SnapshotRetentionForm'
import { FPTresholdForm } from './FPThresholdForm'
import { StragerDetectionForm } from './StrangerDetectionForm'
import { LogoForm } from './LogoForm'
import { SecondaryLogoForm } from './SecondaryLogoForm'

export const APIKeys = () => {
    return (
        <div className='content'>
            <BreadCrumbs origin='Settings' title='Device and Admin Settings' />
            <div className='flex flex-col gap-5 w-[50%] xs:w-full sm:w-full'>
                <div className='flex flex-row xs:flex-col sm:flex-col gap-5'>
                    <EmailForm />
                    <SMSForm />
                </div>
                <div className='flex flex-row xs:flex-col sm:flex-col gap-5'>
                    <MapsForm />
                    <AndroidForm />
                </div>
                <div className='flex flex-row xs:flex-col sm:flex-col gap-5'>
                    <SnapshotRetentionForm />
                    <FPTresholdForm />
                </div>
                <div className='flex flex-row xs:flex-col sm:flex-col gap-5'>
                    <SecondaryLogoForm />
                    <LogoForm />
                </div>
                <div className='flex flex-row gap-5 xs:flex-col sm:flex-col gap-5'>
                    <StragerDetectionForm />
                </div>
            </div>
        </div>
    )
}
