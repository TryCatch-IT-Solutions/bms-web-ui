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
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import ExportDropdown from './ExportDropdown'
import { Checkbox } from '@/components/Checkbox'
import { ExportCounter } from '@/components/ExportCounter'
import { timeEntriesToExportAtom } from '@/store/user'
import { useAtom } from 'jotai'
import { MapIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import { ImageIcon } from '@radix-ui/react-icons'
import { LOGO_URL } from '@/api/axiosInstance'

const tableHeader = [
    { name: 'Record ID' },
    { name: 'Snapshot' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Type' },
    { name: 'Date' },
    { name: 'Action' },
]

export const TimeEntryList: React.FC = () => {
    const [searchVal, setSearchVal] = useState<string | null>('')
    const [start, setStart] = useState<string>('')
    const [end, setEnd] = useState<string>('')
    const [toExport, setToExport] = useAtom(timeEntriesToExportAtom)
    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
    const [selectedOnPage, setSelectedOnPage] = useState<number[]>([])

    const onSearchChange = (val: string) => {
        setTimeout(() => {
            setSearchVal(val)
        }, 500)
    }

    const navigate = useNavigate()

    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const { data: users, isLoading } = useQuery({
        queryKey: ['employeesTimeEntries', pagination, searchVal, start, end],
        queryFn: () => getEmployeeTimeEntries(pagination, searchVal, start, end),
    })

    const handleCheckboxChange = (user: TimeEntryType, isChecked: boolean) => {
        const userToAddOrRemove = users?.content?.find((prevuser) => prevuser.id === user?.id)

        setSelectedOnPage((prev) => {
            const updatedUserIds = isChecked
                ? [...prev, user.id] // Add userId if checked
                : prev.filter((id) => id !== user.id) // Remove userId if unchecked
            return updatedUserIds // Return updated array
        })

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
        setSelectAllChecked(isChecked)
        const currentPageUserIds =
            users?.content
                ?.filter((u: TimeEntryType) => u.id !== 0)
                .map((u: TimeEntryType) => u.id) ?? []

        const updatedUserIds = isChecked
            ? [
                  ...(toExport?.content ?? []),
                  ...(users?.content?.filter((u: TimeEntryType) =>
                      currentPageUserIds.includes(u.id),
                  ) ?? []),
              ] // Ensure it's always an array of correct type
            : (toExport?.content ?? []).filter(
                  (user: TimeEntryType) => !currentPageUserIds.includes(user.id),
              ) // Remove only current page users

        setToExport({
            content: updatedUserIds,
            meta: users?.meta as PaginationType,
        })
    }

    useEffect(() => {
        setSelectAllChecked(false) // Uncheck "Select All" when navigating pages
        setSelectedOnPage([])
        setToExport(null)
    }, [pagination, searchVal, start, end])

    return (
        <div className='content'>
            <BreadCrumbs title='Time Entries' origin='Employees' />
            <div className='mb-5 flex flex-row gap-5 justify-between'>
                <div className='flex flex-row xs:flex-col sm:flex-col gap-5'>
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
                <div className='flex flex-row gap-5'>
                    {toExport && toExport?.content?.length > 0 && (
                        <ExportCounter
                            selected={toExport?.content?.length ?? 0}
                            limit={users?.meta?.total ?? 0}
                        />
                    )}
                    <ExportDropdown
                        timeEntries={toExport as TimeEntriesListType}
                        isDisabled={false}
                    />
                </div>
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
                                            'font-semibold text-bms-gray-medium text-base xs:text-sm sm:text-sm whitespace-nowrap',
                                        )}
                                    >
                                        <span className='flex flex-row gap-2'>
                                            {index === 0 && (
                                                <Checkbox
                                                    checked={
                                                        selectAllChecked ||
                                                        ((selectedOnPage?.length ?? 0) ===
                                                            users?.content?.length &&
                                                            users?.content?.length > 0)
                                                    }
                                                    onCheckedChange={(checked) =>
                                                        handleCheckAll(checked as boolean)
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
                                    className='text-start text-base xs:text-sm sm:text-sm text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2'>
                                        <Checkbox
                                            checked={
                                                toExport?.content?.includes(t) && toExport !== null
                                            } // Check if the user ID is selected
                                            onClick={() =>
                                                handleCheckboxChange(
                                                    t,
                                                    !toExport?.content?.includes(t),
                                                )
                                            }
                                            className='-mt-[.5px]'
                                        />
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
