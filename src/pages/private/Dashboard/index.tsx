import { BreadCrumbs } from '@/components/BreadCrumbs'
import { DeviceStatistics } from './DeviceStatistics'
import { UserAccountStatistics } from './UserAccountStatistics'
import { DeviceTable } from './DeviceTable'
import { useQuery } from '@tanstack/react-query'
import { getDashboardStats } from '@/api/general'
import { DashboardStatusType, DashDevicesType } from '@/api/general/schema'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { TimeEntryTable } from './TimeEntriesTable'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/store/user'
import { ROLE } from '@/constants'

export const Dashboard: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: () => getDashboardStats(),
    })

    const user = useAtomValue(userAtom)

    const isAdmin = user?.role === ROLE.superadmin

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
            {isAdmin && (
                <>
                    <DeviceTable />
                    <TimeEntryTable />
                </>
            )}
        </div>
    )
}
