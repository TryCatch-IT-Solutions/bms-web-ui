import { BreadCrumbs } from '@/components/BreadCrumbs'
import { EditDeviceForm } from './EditDeviceForm'
import { useParams } from 'react-router-dom'

export const EditDevice: React.FC = () => {
    const { id } = useParams()

    return (
        <div className='content'>
            <BreadCrumbs title='Edit Device' origin='Devices' id={Number(id) ?? 0} />
            <EditDeviceForm />
        </div>
    )
}
