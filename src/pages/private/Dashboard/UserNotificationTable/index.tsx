import { getAnnouncement } from '@/api/announcements'
import { AnnountmentType } from '@/api/announcements/schema'
import { Card, CardContent } from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const tableHeader = [{ name: 'Notification ID' }, { name: 'Message' }]

export const UserNotificationTable: React.FC = () => {
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const { data: genNotifications, isLoading: getNotifLoading } = useQuery({
        queryKey: ['userNotification', pagination],
        queryFn: () => getAnnouncement(pagination, 'user'),
    })

    return (
        <div className='mt-10'>
            <p className='font-semibold text-2xl'>User Notification</p>
            <Card className='mt-5'>
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
                            {getNotifLoading && (
                                <TableRow
                                    key={0}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell colSpan={7}>
                                        <AppSkeletonLoadingState />
                                    </TableCell>
                                </TableRow>
                            )}
                            {genNotifications?.content?.map((d: AnnountmentType) => (
                                <TableRow
                                    key={d?.id}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2'>
                                        {d.id}
                                    </TableCell>
                                    <TableCell>{d.message}</TableCell>
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
                    total={genNotifications?.meta.total ?? 0}
                    per_page={pagination?.per_page ?? 10}
                />
            </div>
        </div>
    )
}
