import { getEmployeeTimeEntries } from '@/api/profile'
import { TimeEntryType } from '@/api/profile/schema'
import { Card, CardContent } from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import SearchBar from '@/components/SearchBar'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { TIME_DATE_FORMAT } from '@/constants'
import { cn, formatUnderscoreString } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import dayjs from 'dayjs'
import { BreadCrumbs } from '@/components/BreadCrumbs'

const tableHeader = [
    { name: 'Record ID' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Type' },
    { name: 'Date' },
]

export const TimeEntries: React.FC = () => {
    const [searchVal, setSearchVal] = useState<string | null>('')

    const onSearchChange = (val: string) => {
        setTimeout(() => {
            setSearchVal(val)
        }, 500)
    }

    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 20,
        itemsPerPage: 20,
    })

    const { data: users, isLoading } = useQuery({
        queryKey: ['employeesTimeEntries', pagination, searchVal],
        queryFn: () => getEmployeeTimeEntries(pagination, searchVal),
    })

    return (
        <div className='content'>
            <BreadCrumbs title='Time Entries' origin='Employees' />
            <div className='mb-5 flex flex-row justify-between'>
                <SearchBar
                    placeHolder='Search User'
                    onSearchChange={(e) => onSearchChange(e?.target?.value)}
                />
            </div>
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
                                        {t?.id}
                                    </TableCell>
                                    <TableCell>{t?.employee?.first_name}</TableCell>
                                    <TableCell>{t?.employee?.first_name}</TableCell>
                                    <TableCell>{formatUnderscoreString(t?.type)}</TableCell>
                                    <TableCell>
                                        {dayjs(t?.datetime).format(TIME_DATE_FORMAT.DATE)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination
                        pagination={pagination}
                        setPagination={setPagination}
                        total={users?.meta.total ?? 0}
                        per_page={20}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
