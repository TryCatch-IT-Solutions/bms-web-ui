import { getUserStatusCount } from '@/api/profile'
import { USER_STATUS } from '@/constants'
import { userIdsToDeleteAtom, userSelectedStatusAtom, usersToExportAtom } from '@/store/user'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'

interface UserTabsProps {
    search?: string
    roles?: string[]
    status?: string[]
    available?: boolean
}

export const UserStatusTabs: React.FC<UserTabsProps> = ({ search, roles, available }) => {
    const setSelectedStatus = useSetAtom(userSelectedStatusAtom)
    const setToDelete = useSetAtom(userIdsToDeleteAtom)
    const setToExport = useSetAtom(usersToExportAtom)

    const queryClient = useQueryClient()

    const onSwitchTab = (status: string) => {
        queryClient.invalidateQueries({ queryKey: ['usersList'] })
        setSelectedStatus(status)
        setToDelete(null)
        setToExport(null)
    }

    const { data: userCount } = useQuery({
        queryKey: ['userStatusCount', search, roles, available],
        queryFn: () => getUserStatusCount('users', search, roles, available),
    })

    return (
        <Tabs
            defaultValue={USER_STATUS.ACTIVATED}
            onValueChange={(val) => setSelectedStatus(val)}
            className='bg-white rounded-md w-full'
        >
            <TabsList className='w-full flex flex-row mt-[26px] space-x-4'>
                <TabsTrigger
                    onClick={() => onSwitchTab(USER_STATUS.ACTIVATED)}
                    value={USER_STATUS.ACTIVATED}
                    className={
                        'w-1/2 h-[54px] text-lg text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                    }
                >
                    {`Active (${userCount?.active ?? 0})`}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => onSwitchTab(USER_STATUS.INACTIVE)}
                    value={USER_STATUS.INACTIVE}
                    className={
                        'w-1/2 h-[54px] text-lg text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                    }
                >
                    {`Archived (${userCount?.inactive ?? 0})`}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
