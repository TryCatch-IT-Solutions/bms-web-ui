import { BreadCrumbs } from '@/components/BreadCrumbs'
import { EmailForm } from './EmailForm'
import { SMSForm } from './SMSForm'
import { MapsForm } from './MapsForm'
import { AndroidForm } from './AndroidForm'
import { SnapshotRetentionForm } from './SnapshotRetentionForm'

export const APIKeys = () => {
    return (
        <div className='content'>
            <BreadCrumbs origin='Settings' title='API Keys' />
            <div className='flex flex-col gap-5 w-[50%]'>
                <div className='flex flex-row gap-5'>
                    <EmailForm />
                    <SMSForm />
                </div>
                <div className='flex flex-row gap-5'>
                    <MapsForm />
                    <AndroidForm />
                </div>
                <div className='flex flex-row gap-5'>
                    <SnapshotRetentionForm />
                </div>
            </div>
        </div>
    )
}
