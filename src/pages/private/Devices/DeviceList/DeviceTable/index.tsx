import { getDeviceList } from '@/api/device'
import { DeviceType } from '@/api/device/schema'
import { Button } from '@/components/Button'
import { Card, CardContent } from '@/components/Card'
import { Checkbox } from '@/components/Checkbox'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import SearchBar from '@/components/SearchBar'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { deleteDeviceAtom, groupFilterAtom } from '@/store/device'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteDeviceModal from '../DeleteDeviceModal'
import { DeviceFilterByGroupModal } from './DeviceFilterByGroupModal'
import { SyncNotificationBar } from '@/components/SyncNofificationBar'
import { GearIcon } from '@radix-ui/react-icons'
import BulkSettingsUpdateModal from '../BulkSettingsUpdateModal'
import { PushRecord } from './PushRecord'
import { PullRecord } from './PullRecord'
import { ExportCounter } from '@/components/ExportCounter'

const tableHeader = [
    { name: 'Device ID' },
    { name: 'Device Name' },
    { name: 'Group' },
    { name: 'Model' },
    { name: 'Serial Number' },
    { name: 'Status' },
    { name: 'Last Sync' },
    { name: 'Action' },
]

export const DeviceTable: React.FC = () => {
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const [settingsModal, setSettingsModal] = useState<boolean>(false)

    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
    const [selectedOnPage, setSelectedOnPage] = useState<number[]>([])

    const [devicesToDelete, setDevicesToDelete] = useAtom(deleteDeviceAtom)
    const [groupFilter, setGroupFilter] = useState<boolean>(false)
    const [searchVal, setSearchVal] = useState<string>('')
    const deviceGroupFilter = useAtomValue(groupFilterAtom)

    const [open, setOpen] = useState<boolean>(false)
    const onSearchChange = (val: string) => {
        setSearchVal(val)
    }

    const navigate = useNavigate()

    const { data: devices, isLoading } = useQuery({
        queryKey: ['deviceList', pagination, searchVal, deviceGroupFilter],
        queryFn: () => getDeviceList(pagination, searchVal, deviceGroupFilter ?? 0),
    })

    const handleRowClick = (id: number) => {
        navigate(`/device/edit/${id}`)
    }

    const handleCheckboxChange = (deviceId: number, isChecked: boolean) => {
        setDevicesToDelete((prev) => {
            const updatedDeviceIds = isChecked
                ? [...(prev?.devices ?? []), deviceId] // Add userId if checked
                : (prev?.devices ?? []).filter((id) => id !== deviceId) // Remove userId if unchecked
            return { devices: updatedDeviceIds } // Return updated object with 'user' key
        })

        setSelectedOnPage((prev) => {
            const updatedDeviceIds = isChecked
                ? [...prev, deviceId] // Add userId if checked
                : prev.filter((id) => id !== deviceId) // Remove userId if unchecked
            return updatedDeviceIds // Return updated array
        })
    }

    const handleCheckAll = (isChecked: boolean) => {
        setSelectAllChecked(isChecked)

        const currentPageDeviceIds = devices?.content?.map((d: DeviceType) => d.id) ?? []

        const updatedDeviceIds = isChecked
            ? [...new Set([...(devicesToDelete?.devices ?? []), ...currentPageDeviceIds])] // Ensure it's always an array
            : (devicesToDelete?.devices ?? []).filter((id) => !currentPageDeviceIds.includes(id)) // Remove only current page devices

        setDevicesToDelete({ devices: updatedDeviceIds })
    }

    useEffect(() => {
        setSelectAllChecked(false) // Uncheck "Select All" when navigating pages
        setSelectedOnPage([])
    }, [pagination])

    return (
        <>
            <div className='mb-5 flex flex-row justify-between'>
                <SearchBar
                    placeHolder='Search Device'
                    onSearchChange={(e) => onSearchChange(e?.target?.value)}
                />
                <div className='flex flex-row xs:flex-col sm:flex-col gap-5'>
                    {devicesToDelete?.devices && devicesToDelete?.devices?.length > 0 && (
                        <ExportCounter
                            selected={devicesToDelete?.devices?.length ?? 0}
                            limit={devices?.meta?.total ?? 0}
                        />
                    )}

                    <Button
                        className='bg-bms-gray-500 flex flex-row gap-1'
                        onClick={() => setSettingsModal(true)}
                        disabled={
                            devicesToDelete?.devices?.length === 0 || devicesToDelete === null
                        }
                    >
                        Update Settings
                        <GearIcon className='h-5 w-5' />
                    </Button>
                    <Button
                        variant='outline'
                        className='flex flex-row gap-1'
                        onClick={() => setOpen(true)}
                        disabled={
                            devicesToDelete?.devices?.length === 0 || devicesToDelete === null
                        }
                    >
                        Delete
                        <Trash2Icon className='h-5 w-5' />
                    </Button>
                    <Button type='button' onClick={() => setGroupFilter(true)}>
                        Filter By Group
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className='flex flex-col items-center justify-center'>
                    <div className='py-5'>
                        <SyncNotificationBar />
                    </div>

                    <Table className='table-auto whitespace-normal w-full'>
                        <TableHeader style={{ marginBottom: '10px' }}>
                            <TableRow>
                                {tableHeader.map((header, index) => (
                                    <TableHead
                                        key={index}
                                        className={cn(
                                            'font-semibold text-bms-gray-medium text-base whitespace-nowrap',
                                        )}
                                    >
                                        <span className='flex flex-row items-center gap-2'>
                                            {index === 0 && (
                                                <Checkbox
                                                    checked={
                                                        selectAllChecked ||
                                                        ((selectedOnPage?.length ?? 0) ===
                                                            devices?.content?.length &&
                                                            devices?.content?.length > 0)
                                                    }
                                                    onCheckedChange={(checked) =>
                                                        handleCheckAll(checked as boolean)
                                                    }
                                                    className='-mt-[2px]'
                                                />
                                            )}
                                            {header.name}
                                        </span>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && (
                                <TableRow
                                    key={0}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell colSpan={7}>
                                        <AppSkeletonLoadingState />
                                    </TableCell>
                                </TableRow>
                            )}
                            {devices?.content?.map((d: DeviceType) => (
                                <TableRow
                                    key={d?.id}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2'>
                                        <Checkbox
                                            checked={devicesToDelete?.devices?.includes(d?.id)}
                                            onClick={
                                                () =>
                                                    handleCheckboxChange(
                                                        d?.id,
                                                        !devicesToDelete?.devices?.includes(d?.id),
                                                    ) // Toggle user ID selection
                                            }
                                            className='-mt-[2px]'
                                        />
                                        {d.id}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(d?.id)}>
                                        {d?.nickname ?? '--'}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(d?.id)}>
                                        {d?.group?.name ?? '--'}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(d?.id)}>
                                        {d?.model}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(d?.id)}>
                                        {d?.serial_no}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(d?.id)}>
                                        {d?.is_online === 1 || d?.is_online === true ? (
                                            <span className='text-blue-500'>Online</span>
                                        ) : (
                                            <span className='text-red-500'>Offline</span>
                                        )}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(d?.id)}>
                                        {d?.last_sync}
                                    </TableCell>
                                    <TableCell className='flex flex-rowe gap-4'>
                                        <PushRecord
                                            id={d?.id}
                                            disabled={d?.is_online === 0 || d?.is_online === false}
                                        />{' '}
                                        <PullRecord
                                            id={d?.id}
                                            disabled={d?.is_online === 0 || d?.is_online === false}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <DeleteDeviceModal open={open} setOpen={setOpen} />
            <DeviceFilterByGroupModal open={groupFilter} setOpen={setGroupFilter} />
            <BulkSettingsUpdateModal open={settingsModal} setOpen={setSettingsModal} />
            <div className='mt-5'>
                <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    total={devices?.meta.total ?? 0}
                    per_page={pagination.per_page ?? 10}
                />
            </div>
        </>
    )
}
