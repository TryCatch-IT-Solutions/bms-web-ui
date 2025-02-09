import { BreadCrumbs } from '@/components/BreadCrumbs'
import { DeviceStatistics } from './DeviceStatistics'
import { UserAccountStatistics } from './UserAccountStatistics'
import { DeviceTable } from './DeviceTable'
import { useQuery } from '@tanstack/react-query'
import { getDashboardStats } from '@/api/general'
import { DashboardStatusType, DashDevicesType } from '@/api/general/schema'
import AppSkeletonLoadingState from '@/components/TableLoadingState'

export const Dashboard: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: () => getDashboardStats(),
    })

    return (
        <div className='content flex flex-col gap-5'>
            <BreadCrumbs title='Dashboard' />
            <div className='flex flex-row gap-5'>
                {isLoading ? (
                    <AppSkeletonLoadingState />
                ) : (
                    <>
                        <UserAccountStatistics stats={data as DashboardStatusType} />
                        <DeviceStatistics device={data?.devices as DashDevicesType} />
                    </>
                )}
            </div>
            <DeviceTable />
        </div>
    )
}
