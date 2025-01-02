import { BreadCrumbs } from '@/components/BreadCrumbs'
import { DeviceTable } from './DeviceTable'

export const DeviceList: React.FC = () => {
    return (
        <div className='content'>
            <BreadCrumbs title='Device List' origin='Devices' />
            <DeviceTable />
        </div>
    )
}
