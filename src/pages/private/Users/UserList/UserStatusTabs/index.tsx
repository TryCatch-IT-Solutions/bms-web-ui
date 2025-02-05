import { getUserStatusCount } from '@/api/profile'
import { EMP_ASSIGN_STATUS_TABS, USER_ASSIGN_STATUS_TABS, USER_STATUS } from '@/constants'
import {
    userAssignStatusFilterAtom,
    userIdsToDeleteAtom,
    userSelectedStatusAtom,
    usersToExportAtom,
} from '@/store/user'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

interface UserTabsProps {
    search?: string
    roles?: string[]
    status?: string[]
    available?: boolean
}

export const UserStatusTabs: React.FC<UserTabsProps> = ({ search, roles }) => {
    const setSelectedStatus = useSetAtom(userSelectedStatusAtom)
    const setToDelete = useSetAtom(userIdsToDeleteAtom)
    const setToExport = useSetAtom(usersToExportAtom)
    const setuserAssignStatusFilterAtom = useSetAtom(userAssignStatusFilterAtom)

    const queryClient = useQueryClient()

    const onSwitchTab = (status: string) => {
        queryClient.invalidateQueries({ queryKey: ['usersList'] })
        const isAssigned =
            status === EMP_ASSIGN_STATUS_TABS?.unassigned ||
            status === EMP_ASSIGN_STATUS_TABS?.archive

        const isActive =
            status === EMP_ASSIGN_STATUS_TABS?.unassigned ||
            status === EMP_ASSIGN_STATUS_TABS?.assigned

        setuserAssignStatusFilterAtom(isAssigned)

        setSelectedStatus(isActive ? USER_STATUS.ACTIVATED : USER_STATUS.INACTIVE)
        setToDelete(null)
        setToExport(null)
    }

    const { data: assignedCount } = useQuery({
        queryKey: ['assignedUsersCount', search, roles],
        queryFn: () => getUserStatusCount('users', search, roles, false),
    })

    const { data: unassignedCount } = useQuery({
        queryKey: ['unassignedUsersCount', search, roles],
        queryFn: () => getUserStatusCount('users', search, roles, true),
    })

    const { data: archivedCount } = useQuery({
        queryKey: ['archivedUsersCount', search, roles],
        queryFn: () => getUserStatusCount('users', search, roles, true),
    })

    useEffect(() => {
        setSelectedStatus(USER_STATUS.ACTIVATED)
        setuserAssignStatusFilterAtom(false)
    }, [])

    return (
        <Tabs
            defaultValue={USER_ASSIGN_STATUS_TABS.assigned}
            onValueChange={(val) => setSelectedStatus(val)}
            className='bg-white rounded-md w-full'
        >
            <TabsList className='w-full text-lg xs:text-sm flex flex-row mt-0 xs:mt-[10px] space-x-4 xs:space-x-1'>
                <TabsTrigger
                    onClick={() => onSwitchTab(USER_ASSIGN_STATUS_TABS.assigned)}
                    value={USER_ASSIGN_STATUS_TABS.assigned}
                    className={
                        'w-1/2 h-10 text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                    }
                >
                    {`Assigned (${assignedCount?.active ?? 0})`}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => onSwitchTab(USER_ASSIGN_STATUS_TABS.unassigned)}
                    value={USER_ASSIGN_STATUS_TABS.unassigned}
                    className={
                        'w-1/2 h-10 text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                    }
                >
                    {`Unassigned (${unassignedCount?.active ?? 0})`}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => onSwitchTab(USER_ASSIGN_STATUS_TABS.archive)}
                    value={USER_ASSIGN_STATUS_TABS.archive}
                    className={
                        'w-1/2 h-10 text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                    }
                >
                    {`Archived (${archivedCount?.inactive ?? 0})`}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
