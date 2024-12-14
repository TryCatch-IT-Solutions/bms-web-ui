import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Card, CardContent } from '@/components/Card'
import { DeviceTable } from './DeviceTable'

export const DeviceList: React.FC = () => {
    return (
        <div className='content'>
            <BreadCrumbs title='Device List' origin='Devices' />
            <Card>
                <CardContent>
                    <DeviceTable />
                </CardContent>
            </Card>
        </div>
    )
}
