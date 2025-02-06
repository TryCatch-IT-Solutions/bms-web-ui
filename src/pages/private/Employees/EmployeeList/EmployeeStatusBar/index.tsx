import { getUserStatusCount } from '@/api/profile'
import { SyncNotificationBar } from '@/components/SyncNofificationBar'
import { EMP_ASSIGN_STATUS_TABS, USER_STATUS } from '@/constants'
import {
    employeeAssignStatusFilterAtom,
    employeeExportAtom,
    employeeSelectedStatusAtom,
    employeesToDeleteAtom,
} from '@/store/user'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
interface UserTabsProps {
    search?: string
    roles?: string[]
    status?: string[]
    available?: boolean
    searchType: string
}

export const EmployeeStatusBar: React.FC<UserTabsProps> = ({ search, roles, searchType }) => {
    const setSelectedStatus = useSetAtom(employeeSelectedStatusAtom)
    const setToExport = useSetAtom(employeeExportAtom)
    const setToDelete = useSetAtom(employeesToDeleteAtom)

    const setuserAssignStatusFilterAtom = useSetAtom(employeeAssignStatusFilterAtom)

    const onSwitchTab = (status: string) => {
        const isAssigned =
            status === EMP_ASSIGN_STATUS_TABS?.unassigned ||
            status === EMP_ASSIGN_STATUS_TABS?.archive

        const isActive =
            status === EMP_ASSIGN_STATUS_TABS?.unassigned ||
            status === EMP_ASSIGN_STATUS_TABS?.assigned

        setSelectedStatus(isActive ? USER_STATUS.ACTIVATED : USER_STATUS.INACTIVE)

        setuserAssignStatusFilterAtom(isAssigned)
        setToExport(null)
        setToDelete(null)
    }

    const { data: assignedCount } = useQuery({
        queryKey: ['assignedEmpCount', search, roles],
        queryFn: () => getUserStatusCount('employee', search, roles, searchType, false),
    })

    const { data: unassignedCount } = useQuery({
        queryKey: ['unassignedEmpCount', search, roles],
        queryFn: () => getUserStatusCount('employee', search, roles, searchType, true),
    })

    const { data: archivedCount } = useQuery({
        queryKey: ['archivedCount', search, roles],
        queryFn: () => getUserStatusCount('employee', search, roles, searchType, true),
    })

    useEffect(() => {
        setSelectedStatus(USER_STATUS.ACTIVATED)
        setuserAssignStatusFilterAtom(false)
    }, [])

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='mt-2'>
                <SyncNotificationBar />
            </div>
            <Tabs
                defaultValue={EMP_ASSIGN_STATUS_TABS.assigned}
                onValueChange={(val) => setSelectedStatus(val)}
                className='bg-white rounded-md w-full'
            >
                <TabsList className='w-full flex flex-row mt-5 space-x-4'>
                    <TabsTrigger
                        onClick={() => onSwitchTab(EMP_ASSIGN_STATUS_TABS.assigned)}
                        value={EMP_ASSIGN_STATUS_TABS.assigned}
                        className={
                            'w-1/2 h-[54px] text-lg text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                        }
                    >
                        {`Assigned (${assignedCount?.active ?? 0})`}
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => onSwitchTab(EMP_ASSIGN_STATUS_TABS.unassigned)}
                        value={EMP_ASSIGN_STATUS_TABS.unassigned}
                        className={
                            'w-1/2 h-[54px] text-lg text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                        }
                    >
                        {`Unassigned (${unassignedCount?.active ?? 0})`}
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => onSwitchTab(EMP_ASSIGN_STATUS_TABS.archive)}
                        value={EMP_ASSIGN_STATUS_TABS.archive}
                        className={
                            'w-1/2 h-[54px] text-lg text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                        }
                    >
                        {`Archived (${archivedCount?.inactive ?? 0})`}
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}
