import { BreadCrumbs } from '@/components/BreadCrumbs'
import { EmailForm } from './EmailForm'
import { SMSForm } from './SMSForm'
import { MapsForm } from './MapsForm'

export const APIKeys = () => {
    return (
        <div className='content'>
            <BreadCrumbs origin='Settings' title='API Keys' />
            <div className='flex flex-col gap-5 w-[50%]'>
                <EmailForm />
                <SMSForm />
                <MapsForm />
            </div>
        </div>
    )
}
