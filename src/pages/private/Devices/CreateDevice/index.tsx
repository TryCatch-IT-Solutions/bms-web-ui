import { BreadCrumbs } from '@/components/BreadCrumbs'
import { CreateDeviceForm } from './CreateDeviceForm'

export const CreateDevice: React.FC = () => {
    return (
        <div className='content'>
            <BreadCrumbs title='Create Device' origin='Devices' />
            <CreateDeviceForm />
        </div>
    )
}
