import { getDeviceList } from '@/api/device'
import { DeviceType } from '@/api/device/schema'
import { Card, CardContent, CardHeader } from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { groupFilterAtom } from '@/store/device'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PushRecord } from '../../Devices/DeviceList/DeviceTable/PushRecord'
import { PullRecord } from '../../Devices/DeviceList/DeviceTable/PullRecord'

const tableHeader = [
    { name: 'Device ID' },
    { name: 'Device Name' },
    { name: 'Group' },
    { name: 'Model' },
    { name: 'Serial Number' },
    { name: 'Status' },
    { name: 'Last Sync' },
    { name: 'Dashboard' },
]

export const DeviceTable: React.FC = () => {
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const deviceGroupFilter = useAtomValue(groupFilterAtom)

    const navigate = useNavigate()

    const { data: devices, isLoading } = useQuery({
        queryKey: ['deviceList', pagination, '', deviceGroupFilter],
        queryFn: () => getDeviceList(pagination, '', deviceGroupFilter ?? 0),
    })

    const handleRowClick = (id: number) => {
        navigate(`/device/edit/${id}`)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <p className='font-bold text-bms-gray-500 text-lg'>Device List</p>
                </CardHeader>
                <CardContent>
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
                                        {d?.is_online === 1 ? (
                                            <span className='text-blue-500'>Online</span>
                                        ) : (
                                            <span className='text-red-500'>Offline</span>
                                        )}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(d?.id)}>
                                        {d?.last_sync}
                                    </TableCell>
                                    <TableCell className='flex flex-row gap-5'>
                                        <PushRecord id={d?.id} /> <PullRecord id={d?.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
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
