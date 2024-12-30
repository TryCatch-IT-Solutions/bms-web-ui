import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Card, CardContent } from '@/components/Card'
import { DeviceTable } from './DeviceTable'
import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/Button'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import DeleteDeviceModal from './DeleteDeviceModal'

export const DeviceList: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const onSearchChange = (val: string) => {
        console.log(val)
    }

    return (
        <div className='content'>
            <BreadCrumbs title='Device List' origin='Devices' />
            <div className='mb-5 flex flex-row justify-between'>
                <SearchBar placeHolder='Search Device' onSearchChange={() => onSearchChange} />
                <div className='flex flex-row gap-5'>
                    <Button
                        variant='outline'
                        className='flex flex-row gap-1'
                        onClick={() => setOpen(true)}
                    >
                        Delete
                        <Trash2Icon className='h-4' />
                    </Button>
                </div>
            </div>
            <Card>
                <CardContent>
                    <DeviceTable />
                </CardContent>
            </Card>
            <DeleteDeviceModal open={open} setOpen={setOpen} />
        </div>
    )
}
