import { getEmployeeTimeEntries } from '@/api/profile'
import { TimeEntriesListType, TimeEntryType } from '@/api/profile/schema'
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
import ExportDropdown from './ExportDropdown'
import { Checkbox } from '@/components/Checkbox'
;``
const tableHeader = [
    { name: 'Record ID' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Type' },
    { name: 'Date' },
]

export const TimeEntries: React.FC = () => {
    const [searchVal, setSearchVal] = useState<string | null>('')
    const [start, setStart] = useState<string>('')
    const [end, setEnd] = useState<string>('')
    const [toExport, setToExport] = useState<TimeEntriesListType | null>(null)

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
        queryKey: ['employeesTimeEntries', pagination, searchVal, start, end],
        queryFn: () => getEmployeeTimeEntries(pagination, searchVal, start, end),
    })

    const handleCheckboxChange = (user: TimeEntryType, isChecked: boolean) => {
        const userToAddOrRemove = users?.content?.find((prevuser) => prevuser.id === user?.id)

        setToExport((prevExportData: any) => {
            const updatedContent = isChecked
                ? [...(prevExportData?.content ?? []), userToAddOrRemove] // Add the full user profile to export data
                : (prevExportData?.content ?? []).filter(
                      (prevuser: TimeEntryType) => prevuser.id !== user.id,
                  ) // Remove user profile from export data

            return {
                ...prevExportData,
                content: updatedContent, // Update content with the new list of users
            }
        })
    }

    const handleCheckAll = (isChecked: boolean) => {
        setToExport({
            content: isChecked ? users?.content ?? [] : [],
            meta: users?.meta as PaginationType,
        })
    }

    return (
        <div className='content'>
            <BreadCrumbs title='Time Entries' origin='Employees' />
            <div className='mb-5 flex flex-row gap-5 justify-between'>
                <div className='flex flex-row gap-5'>
                    <SearchBar
                        placeHolder='Search User'
                        onSearchChange={(e) => onSearchChange(e?.target?.value)}
                    />

                    <input
                        type='date'
                        className={cn(
                            'peer flex h-[45px] w-full text-base rounded-sm border border-bms-gray-300 placeholder:text-transparent bg-transparent px-3 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-bms-gray-medium',
                            'focus:text-inherit w-15',
                        )}
                        placeholder='Start Date'
                        onChange={(e) => setStart(e.target.value)}
                        value={start}
                    />

                    <input
                        type='date'
                        className={cn(
                            'peer flex h-[45px] w-full text-base rounded-sm border border-bms-gray-300 placeholder:text-transparent bg-transparent px-3 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#ebebeb] disabled:text-bms-gray-medium',
                            'focus:text-inherit w-15',
                        )}
                        placeholder='End Date'
                        onChange={(e) => setEnd(e.target.value)}
                        value={end}
                    />
                </div>
                <ExportDropdown timeEntries={users} isDisabled={false} />
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
                                        <span className='flex flex-row gap-2'>
                                            {index === 0 && (
                                                <Checkbox
                                                    checked={
                                                        toExport?.content?.length ===
                                                            users?.content?.length &&
                                                        toExport !== null
                                                    }
                                                    onCheckedChange={() =>
                                                        handleCheckAll(
                                                            toExport?.content?.length !==
                                                                users?.content?.length,
                                                        )
                                                    }
                                                    className='mt-[3px]'
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
                            {users?.content?.map((t: TimeEntryType) => (
                                <TableRow
                                    key={t?.id}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2'>
                                        <Checkbox
                                            checked={toExport?.content?.includes(t)} // Check if the user ID is selected
                                            onClick={
                                                () =>
                                                    handleCheckboxChange(
                                                        t,
                                                        !toExport?.content?.includes(t),
                                                    ) // Toggle user ID selection
                                            }
                                            className='-mt-[.5px]'
                                        />
                                        {t.id}
                                    </TableCell>
                                    <TableCell>{t?.employee?.first_name}</TableCell>
                                    <TableCell>{t?.employee?.first_name}</TableCell>
                                    <TableCell>{formatUnderscoreString(t?.type)}</TableCell>
                                    <TableCell>
                                        {dayjs(t?.datetime).format(TIME_DATE_FORMAT.DATE_TIME)}
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
