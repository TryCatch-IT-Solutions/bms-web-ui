import { DashDevicesType } from '@/api/general/schema'
import { Card, CardContent, CardHeader } from '@/components/Card'
import { ROLE } from '@/constants'
import { userAtom } from '@/store/user'
import { MobileIcon } from '@radix-ui/react-icons'
import { useAtomValue } from 'jotai'
import { WifiIcon, WifiOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface DeviceStatisticsProps {
    device: DashDevicesType
}

export const DeviceStatistics: React.FC<DeviceStatisticsProps> = ({ device }) => {
    const navigate = useNavigate()

    const user = useAtomValue(userAtom)

    const isAdmin = user?.role === ROLE.superadmin

    const handleNavigate = () => {
        if (isAdmin) {
            navigate('/device/list')
        }
    }

    return (
        <Card className='w-fit xs:w-full sm:w-full items-center justify-center'>
            <CardHeader>
                <p className='font-bold text-bms-gray-500 text-lg'>Devices</p>
            </CardHeader>
            <CardContent className='flex flex-col items-center gap-5'>
                <button
                    onClick={() => handleNavigate}
                    className='flex flex-row gap-5 bg-blue-500 p-5 items-center rounded-md w-[15rem]'
                >
                    <div className='flex flex-col gap-5 text-white'>
                        <WifiIcon className='h-10 w-10' />
                    </div>

                    <span className='flex flex-row gap-2 text-white'>
                        <p className='font-semibold'>Online</p>
                        <p>{device?.online}</p>
                    </span>
                </button>

                <button
                    onClick={() => handleNavigate}
                    className='flex flex-row gap-5 bg-bms-primary p-5 items-center rounded-md w-[15rem]'
                >
                    <div className='flex flex-col gap-5 text-white'>
                        <WifiOff className='h-10 w-10' />
                    </div>

                    <span className='flex flex-row gap-2 text-white'>
                        <p className='font-semibold'>Offline</p>
                        <p>{device?.offline}</p>
                    </span>
                </button>

                <button
                    onClick={() => handleNavigate}
                    className='flex flex-row gap-5 bg-bms-gray-500 p-5 items-center rounded-md w-[15rem]'
                >
                    <div className='flex flex-col gap-5 text-white'>
                        <MobileIcon className='h-10 w-10' />
                    </div>

                    <span className='flex flex-row gap-2 text-white'>
                        <p className='font-semibold'>Total</p>
                        <p>{device?.total}</p>
                    </span>
                </button>
            </CardContent>
        </Card>
    )
}
