import { DashboardStatusType } from '@/api/general/schema'
import { Card, CardContent, CardHeader } from '@/components/Card'
import { BellRingIcon, UserCog, UsersIcon, UsersRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface UserAccountStatisticsProps {
    stats: DashboardStatusType
}

export const UserAccountStatistics: React.FC<UserAccountStatisticsProps> = ({ stats }) => {
    const navigate = useNavigate()

    return (
        <Card className='w-fit'>
            <CardHeader>
                <p className='font-bold text-bms-gray-500 text-lg'>User Account Statistics</p>
            </CardHeader>
            <CardContent className='flex flex-row'>
                <button
                    onClick={() => navigate('/user/list')}
                    className='flex flex-row items-center gap-5 text-bms-gray-500 hover:rounded-md border border-1 border-y-0 border-l-0 border-bms-gray-300 p-5 hover:bg-gray-100'
                >
                    <UserCog className='text-bms-primary h-14 w-14' />

                    <span className='flex flex-col gap-2'>
                        <p className='font-semibold'>Group Admin</p>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>Assigned:</p>
                            <p>{stats?.group_admin?.assigned}</p>
                        </span>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>Unassigned:</p>
                            <p>{stats?.group_admin?.unassigned}</p>
                        </span>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>Total:</p>
                            <p>{stats?.group_admin?.assigned + stats.group_admin?.unassigned}</p>
                        </span>
                    </span>
                </button>

                <button
                    onClick={() => navigate('/employee/list')}
                    className='flex flex-row items-center gap-5 text-bms-gray-500 hover:rounded-md border border-1 border-y-0 border-l-0 border-bms-gray-300 p-5 hover:bg-gray-100'
                >
                    <UsersIcon className='text-bms-primary h-14 w-14' />
                    <span className='flex flex-col gap-2'>
                        <p className='font-semibold'>Employee</p>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>Assigned:</p>
                            <p>{stats?.employees?.assigned}</p>
                        </span>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>Unassigned:</p>
                            <p>{stats?.employees?.unassigned}</p>
                        </span>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>Total:</p>
                            <p>{stats?.employees?.assigned + stats?.employees?.unassigned}</p>
                        </span>
                    </span>
                </button>

                <button
                    onClick={() => navigate('/notification/list')}
                    className='flex flex-row items-center gap-5 text-bms-gray-500 hover:rounded-md border border-1 border-y-0 border-l-0 border-bms-gray-300 p-5 hover:bg-gray-100'
                >
                    <BellRingIcon className='text-bms-primary h-14 w-14' />
                    <span className='flex flex-col gap-2'>
                        <p className='font-semibold'>Announcements</p>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>General:</p>
                            <p>{stats?.announcements?.general}</p>
                        </span>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>User:</p>
                            <p>{stats?.announcements?.specific}</p>
                        </span>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>Total:</p>
                            <p>{stats?.announcements?.general + stats?.announcements?.specific}</p>
                        </span>
                    </span>
                </button>

                <button
                    onClick={() => navigate('/group/list')}
                    className='flex flex-row  gap-5 text-bms-gray-500 p-5 hover:bg-gray-100 hover:rounded-md'
                >
                    <div className='mt-[22%]'>
                        <UsersRound className='text-bms-primary h-14 w-14' />
                    </div>
                    <span className='flex flex-col gap-2'>
                        <p className='font-semibold text-left'>Groups</p>
                        <span className='flex flex-row gap-5 justify-between'>
                            <p>Total:</p>
                            <p>{stats?.groups?.total}</p>
                        </span>
                    </span>
                </button>
            </CardContent>
        </Card>
    )
}
