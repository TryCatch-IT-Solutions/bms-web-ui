import { getUsers } from '@/api/profile'
import { ProfileType, UserListType } from '@/api/profile/schema'
import { Card, CardContent } from '@/components/Card'
import { Checkbox } from '@/components/Checkbox'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import SearchBar from '@/components/SearchBar'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import {
    EMAIL_CONFLICT_LABEL,
    ROLE,
    TIME_DATE_FORMAT,
    USER_SEARCH_TYPE_OPTIONS,
    USER_STATUS,
} from '@/constants'
import {
    employeeExportAtom,
    employeeSelectedStatusAtom,
    employeesToDeleteAtom,
    employeeAssignStatusFilterAtom,
    userAtom,
} from '@/store/user'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImportDropdown from '../ImportDropdown'
import ExportDropdown from '../ExportDropdown'
import { Button } from '@/components/Button'
import { Trash2Icon } from 'lucide-react'
import { EmployeeStatusBar } from '../EmployeeStatusBar'
import DeleteEmployeeModal from '../DeleteEmployeeModal'
import dayjs from 'dayjs'
import { ArchiveIcon, ResetIcon } from '@radix-ui/react-icons'
import { ExportCounter } from '@/components/ExportCounter'
import { SearchBarDropdown } from '@/components/SearchbarDropdown'
import PermanentDeleteModal from '../PermanentDeleteModal'
import { MergeLabel } from '@/components/MergeLabel'

const tableHeader = [
    { name: 'Account Number' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email Address' },
    { name: 'Contact Number' },
    { name: 'Address' },
    { name: 'Birth Date' },
]

export const EmployeeTable: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const selectedStatus = useAtomValue(employeeSelectedStatusAtom)
    const [searchVal, setSearchVal] = useState<string | null>('')
    const [employeesToExport, setEmployeeExportAtom] = useAtom(employeeExportAtom)
    const [userIdsToDelete, setUserIdsToDelete] = useAtom(employeesToDeleteAtom)
    const [userStatusFilter, setUserStatusFilter] = useAtom(employeeAssignStatusFilterAtom)
    const [searchType, setSearchType] = useState<string>('full_name')
    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
    const [selectedOnPage, setSelectedOnPage] = useState<number[]>([])

    const user = useAtomValue(userAtom)

    const onSearchChange = (val: string) => {
        setSearchVal(val)
    }

    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const navigate = useNavigate()

    const { data: users, isLoading } = useQuery({
        queryKey: ['employeeList', pagination, selectedStatus, searchVal, userStatusFilter],
        queryFn: () =>
            getUsers(
                pagination,
                [selectedStatus],
                [ROLE.employee],
                userStatusFilter,
                searchVal,
                searchType,
            ),
    })

    const handleRowClick = (id: number) => {
        selectedStatus === USER_STATUS.ACTIVATED ? navigate(`/employee/edit/${id}`) : null
    }

    const handleCheckboxChange = (userId: number, isChecked: boolean) => {
        setUserIdsToDelete((prev) => {
            const updatedUserIds = isChecked
                ? [...(prev?.users ?? []), userId]
                : (prev?.users ?? []).filter((id) => id !== userId)
            return { users: updatedUserIds }
        })

        setSelectedOnPage((prev) => {
            const updatedUserIds = isChecked
                ? [...prev, userId]
                : prev.filter((id) => id !== userId)

            // Check if all users on the page are selected
            const currentPageUserIds = users?.content?.map((u: ProfileType) => u.id) ?? []
            setSelectAllChecked(updatedUserIds.length === currentPageUserIds.length)

            return updatedUserIds
        })

        const userToAddOrRemove = users?.content?.find((user) => user.id === userId)

        setEmployeeExportAtom((prevExportData: any) => {
            const updatedContent = isChecked
                ? [...(prevExportData?.content ?? []), userToAddOrRemove]
                : (prevExportData?.content ?? []).filter((user: ProfileType) => user.id !== userId)

            return {
                ...prevExportData,
                content: updatedContent,
            }
        })
    }

    const handleCheckAll = (isChecked: boolean) => {
        setSelectAllChecked(isChecked)

        const currentPageUserIds =
            users?.content?.filter((u: ProfileType) => u.id !== 1).map((u: ProfileType) => u.id) ??
            []

        const updatedUserIds = isChecked
            ? [...new Set([...(userIdsToDelete?.users ?? []), ...currentPageUserIds])] // Ensure it's always an array
            : (userIdsToDelete?.users ?? []).filter((id) => !currentPageUserIds.includes(id)) // Remove only current page users

        setUserIdsToDelete({ users: updatedUserIds })

        setEmployeeExportAtom({
            content: isChecked
                ? [
                      ...new Set([
                          ...(employeesToExport?.content ?? []),
                          ...(users?.content?.filter((u: ProfileType) => u.id !== 1) ?? []),
                      ]),
                  ]
                : (employeesToExport?.content ?? []).filter(
                      (u) => !currentPageUserIds.includes(u.id),
                  ), // Remove only current page users
            meta: users?.meta as PaginationType,
        })
    }

    const handleResetFilter = () => {
        setUserStatusFilter(null)
        setSearchVal('')
    }

    useEffect(() => {
        setSelectAllChecked(false) // Uncheck "Select All" when navigating pages
        setSelectedOnPage([])
    }, [pagination, selectedStatus, searchVal, userStatusFilter])

    return (
        <>
            <div className='mb-5 flex flex-row xs:gap-5 sm:gap-5 justify-between'>
                <div className='flex flex-row xs:flex-col sm:flex-col xs:gap-5 sm:gap-5 gap-1'>
                    <SearchBar
                        placeHolder='Search Employee'
                        onSearchChange={(e) => onSearchChange(e?.target?.value)}
                        value={searchVal ? searchVal : ''}
                    />
                    <SearchBarDropdown
                        options={USER_SEARCH_TYPE_OPTIONS}
                        onChange={(e) => setSearchType(e)}
                        value={searchType ?? ''}
                    />
                    <Button onClick={handleResetFilter} variant='outlineTwo'>
                        <ResetIcon />
                    </Button>
                </div>

                <div className='flex flex-row xs:flex-col sm:flex-col gap-5'>
                    {employeesToExport && employeesToExport?.content?.length > 0 && (
                        <ExportCounter
                            selected={employeesToExport?.content?.length ?? 0}
                            limit={users?.meta?.total ?? 0}
                        />
                    )}
                    <ImportDropdown />
                    <ExportDropdown
                        isDisabled={
                            (employeesToExport && employeesToExport?.content?.length === 0) ?? true
                        }
                        employeeListData={employeesToExport as UserListType}
                    />
                    {user?.role === ROLE.superadmin && (
                        <Button
                            variant='outline'
                            type='button'
                            className='flex flex-row gap-1'
                            onClick={() => setOpen(true)}
                            disabled={
                                userIdsToDelete === null || userIdsToDelete.users.length === 0
                            }
                        >
                            {selectedStatus === USER_STATUS.ACTIVATED ? 'Archive' : 'Restore'}
                            <ArchiveIcon className='h-4' />
                        </Button>
                    )}
                    {user?.role === ROLE.superadmin && (
                        <Button
                            variant='outline'
                            type='button'
                            className='flex flex-row gap-1'
                            onClick={() => setDeleteModal(true)}
                            disabled={
                                userIdsToDelete === null || userIdsToDelete.users.length === 0
                            }
                        >
                            Delete
                            <Trash2Icon className='h-4' />
                        </Button>
                    )}
                </div>
            </div>
            <Card className='bg-white w-full overflow-x-auto'>
                <CardContent className='mt-4 flex flex-col'>
                    <EmployeeStatusBar
                        search={searchVal ?? ''}
                        roles={['employee']}
                        status={[selectedStatus]}
                        available={userStatusFilter as boolean}
                        searchType={searchType}
                    />
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
                            {users?.content?.map((u: ProfileType) => (
                                <TableRow
                                    key={u?.id}
                                    className={cn(
                                        'text-start text-base text-bms-gray-dark cursor-pointer',
                                        u?.email.includes(EMAIL_CONFLICT_LABEL) && 'bg-red-100',
                                    )}
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2'>
                                        <Checkbox
                                            checked={
                                                userIdsToDelete?.users?.includes(u.id) ||
                                                employeesToExport?.content?.includes(u)
                                            } // Check if the user ID is selected// Check if the user ID is selected
                                            onClick={() =>
                                                handleCheckboxChange(
                                                    u.id,
                                                    !userIdsToDelete?.users?.includes(u.id),
                                                )
                                            }
                                            className='-mt-[.5px]'
                                        />
                                        {u.id}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(u?.id)}>
                                        {u.first_name}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(u?.id)}>
                                        {u.last_name}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => handleRowClick(u?.id)}
                                        className='flex flex-row gap-2 items-center'
                                    >
                                        {u.email}
                                        {u?.email.includes(EMAIL_CONFLICT_LABEL) && <MergeLabel />}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(u?.id)}>
                                        {u.phone_number}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(u?.id)}>
                                        <p className='w-40 truncate'>
                                            {u.address1}
                                            {u.address2 ? u.address2 + ', ' : ', '}
                                            {u.barangay}, {u.municipality}, {u.province}
                                        </p>
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(u?.id)}>
                                        {dayjs(u.birth_date).format(TIME_DATE_FORMAT.DATE)}
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
            <DeleteEmployeeModal open={open} setOpen={setOpen} />
            <PermanentDeleteModal setOpen={setDeleteModal} open={deleteModal} />
        </>
    )
}
