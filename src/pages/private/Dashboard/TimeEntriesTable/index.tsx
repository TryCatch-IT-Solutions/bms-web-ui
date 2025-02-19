import { getEmployeeTimeEntries } from '@/api/profile'
import { TimeEntryType } from '@/api/profile/schema'
import { Card, CardContent, CardHeader } from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { TIME_DATE_FORMAT } from '@/constants'
import { cn, formatUnderscoreString } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import dayjs from 'dayjs'
import { MapIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import { ImageIcon } from '@radix-ui/react-icons'
import { LOGO_URL } from '@/api/axiosInstance'
;``
const tableHeader = [
    { name: 'Record ID' },
    { name: 'Snapshot' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Type' },
    { name: 'Date' },
    { name: 'Action' },
]

export const TimeEntryTable: React.FC = () => {
    const navigate = useNavigate()

    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const { data: users, isLoading } = useQuery({
        queryKey: ['employeesTimeEntries', pagination, null, '', ''],
        queryFn: () => getEmployeeTimeEntries(pagination, null, '', ''),
    })

    return (
        <div>
            <Card className='bg-white w-full overflow-x-auto'>
                <CardHeader>
                    <p className='text-bms-gray-500 font-semibold text-lg'>Time Entries</p>
                </CardHeader>
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
                                        <span className='flex flex-row gap-2'>{header.name}</span>
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
                            {users?.content?.map((t: TimeEntryType) => (
                                <TableRow
                                    key={t?.id}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2'>
                                        {t.id}
                                    </TableCell>
                                    <TableCell>
                                        {t?.snapshot ? (
                                            <img
                                                src={LOGO_URL + t?.snapshot}
                                                className='h-12 w-10'
                                            />
                                        ) : (
                                            <ImageIcon className='h-12 w-10 text-gray-300' />
                                        )}
                                    </TableCell>
                                    <TableCell>{t?.employee?.first_name}</TableCell>
                                    <TableCell>{t?.employee?.last_name}</TableCell>
                                    <TableCell>{formatUnderscoreString(t?.type)}</TableCell>
                                    <TableCell>
                                        {dayjs(t?.datetime).format(TIME_DATE_FORMAT.DATE_TIME)}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className='flex flex-row gap-1 text-bms-gray-600 hover:text-bms-primary'
                                            variant='outline'
                                            disabled={
                                                t?.lat === null ||
                                                t?.lon === null ||
                                                t?.lat === undefined ||
                                                t?.lon === undefined
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/employee/time-entries/map-view?lat=${
                                                        t?.lat ?? 14.69177
                                                    }&lon=${t?.lon ?? 120.538582}`,
                                                )
                                            }
                                        >
                                            Map View <MapIcon />
                                        </Button>
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
                    total={users?.meta.total ?? 0}
                    per_page={pagination.per_page ?? 10}
                />
            </div>
        </div>
    )
}
