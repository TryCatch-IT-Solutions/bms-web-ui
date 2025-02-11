import { DashboardStatusType } from '@/api/general/schema'
import { Card, CardContent, CardHeader } from '@/components/Card'
import { ROLE } from '@/constants'
import { userAtom } from '@/store/user'
import { useAtomValue } from 'jotai'
import { BellRingIcon, UserCog, UsersIcon, UsersRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface UserAccountStatisticsProps {
    stats: DashboardStatusType
}

export const UserAccountStatistics: React.FC<UserAccountStatisticsProps> = ({ stats }) => {
    const navigate = useNavigate()

    const user = useAtomValue(userAtom)

    const isAdmin = user?.role === ROLE.superadmin

    return (
        <Card className='w-fit xs:w-full sm:w-full'>
            <CardHeader>
                <p className='font-bold text-bms-gray-500 text-lg'>User Account Statistics</p>
            </CardHeader>
            <CardContent className='flex flex-col gap-5'>
                <div className='flex flex-row xs:flex-col sm:flex-col items-center gap-5'>
                    {isAdmin && (
                        <button
                            onClick={() => navigate('/user/list')}
                            className='w-[15rem] h-[12rem] rounded-md flex flex-row items-center gap-5 text-bms-gray-500 border border-1 border-bms-gray-300 p-5 hover:bg-gray-100'
                        >
                            <UserCog className='text-bms-primary h-14 w-14' />

                            <span className='flex flex-col gap-2'>
                                <p className='font-semibold text-left'>Group Admin</p>
                                <span className='flex flex-row gap-5 justify-between'>
                                    <p>Assigned:</p>
                                    <p>{stats?.group_admin?.assigned ?? 0}</p>
                                </span>
                                <span className='flex flex-row gap-5 justify-between'>
                                    <p>Unassigned:</p>
                                    <p>{stats?.group_admin?.unassigned ?? 0}</p>
                                </span>
                                <span className='flex flex-row gap-5 justify-between'>
                                    <p>Total:</p>
                                    <p>
                                        {(stats?.group_admin?.assigned ?? 0) +
                                            (stats.group_admin?.unassigned ?? 0)}
                                    </p>
                                </span>
                            </span>
                        </button>
                    )}

                    <button
                        onClick={() => navigate('/employee/list')}
                        className='w-[15rem] h-[12rem] rounded-md flex flex-row items-center gap-5 text-bms-gray-500 border border-1 border-bms-gray-300 p-5 hover:bg-gray-100'
                    >
                        <UsersIcon className='text-bms-primary h-14 w-14' />
                        <span className='flex flex-col gap-2'>
                            <p className='font-semibold text-left'>Employee</p>
                            <span className='flex flex-row gap-5 justify-between'>
                                <p>Assigned:</p>
                                <p>{stats?.employees?.assigned ?? 0}</p>
                            </span>
                            <span className='flex flex-row gap-5 justify-between'>
                                <p>Unassigned:</p>
                                <p>{stats?.employees?.unassigned ?? 0}</p>
                            </span>
                            <span className='flex flex-row gap-5 justify-between'>
                                <p>Total:</p>
                                <p>
                                    {(stats?.employees?.assigned ?? 0) +
                                        (stats?.employees?.unassigned ?? 0)}
                                </p>
                            </span>
                        </span>
                    </button>
                </div>

                <div className='flex flex-row xs:flex-col sm:flex-col items-center gap-5'>
                    <button
                        onClick={() => navigate('/notification/list')}
                        className='w-[15rem] h-[12rem] rounded-md flex flex-row items-center gap-5 text-bms-gray-500 border border-1 border-bms-gray-300 p-5 hover:bg-gray-100'
                    >
                        <BellRingIcon className='text-bms-primary h-14 w-14' />
                        <span className='flex flex-col gap-2'>
                            <p className='font-semibold text-left'>Announcements</p>
                            <span className='flex flex-row gap-5 justify-between'>
                                <p>General:</p>
                                <p>{stats?.announcements?.general ?? 0}</p>
                            </span>
                            <span className='flex flex-row gap-5 justify-between'>
                                <p>User:</p>
                                <p>{stats?.announcements?.specific ?? 0}</p>
                            </span>
                            <span className='flex flex-row gap-5 justify-between'>
                                <p>Total:</p>
                                <p>
                                    {(stats?.announcements?.general ?? 0) +
                                        (stats?.announcements?.specific ?? 0)}
                                </p>
                            </span>
                        </span>
                    </button>

                    {isAdmin && (
                        <button
                            onClick={() => navigate('/group/list')}
                            className='flex flex-row w-[15rem] h-[12rem] rounded-md border border-1 border-gray-300 gap-5 text-bms-gray-500 p-5 hover:bg-gray-100'
                        >
                            <div className='mt-[22%]'>
                                <UsersRound className='text-bms-primary h-14 w-14' />
                            </div>
                            <span className='flex flex-col gap-2'>
                                <p className='font-semibold text-left'>Groups</p>
                                <span className='flex flex-row gap-5 justify-between'>
                                    <p>Total:</p>
                                    <p>{stats?.groups?.total ?? 0}</p>
                                </span>
                            </span>
                        </button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
