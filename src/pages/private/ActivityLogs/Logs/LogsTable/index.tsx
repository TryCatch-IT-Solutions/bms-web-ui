import { getLogList } from '@/api/log'
import { LogRecordType } from '@/api/log/schema'
import { Card, CardContent } from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { TIME_DATE_FORMAT } from '@/constants'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'

const tableHeader = [
    { name: 'Log Number' },
    { name: 'User' },
    { name: 'Action' },
    { name: 'Description' },
    { name: 'Date' },
]

export const LogsTable: React.FC = () => {
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const { data: logs, isLoading } = useQuery({
        queryKey: ['logs', pagination],
        queryFn: () => getLogList(pagination),
    })

    return (
        <>
            <Card className='bg-white w-full overflow-x-auto'>
                <CardContent className='mt-4'>
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
                                        {header.name}
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
                            {logs?.content?.map((l: LogRecordType) => (
                                <TableRow
                                    key={l?.id}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                                        {l.id}
                                    </TableCell>
                                    <TableCell>
                                        {l?.user?.first_name} {l?.user?.last_name}
                                    </TableCell>
                                    <TableCell>
                                        {l.action?.replace(/([A-Z])/g, ' $1').trim()}
                                    </TableCell>
                                    <TableCell>{l.description}</TableCell>
                                    <TableCell>
                                        {dayjs(l.created_at).format(TIME_DATE_FORMAT.DATE_TIME)}
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
                    total={logs?.meta?.total ?? 0}
                    per_page={pagination.per_page ?? 10}
                />
            </div>
        </>
    )
}
