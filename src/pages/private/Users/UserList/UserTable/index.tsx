import {
    userRoleFilterAtom,
    userIdsToDeleteAtom,
    usersToExportAtom,
    userAssignStatusFilterAtom,
} from '@/store/user'
import { getUsers } from '@/api/profile'
import { ProfileType, UserListType } from '@/api/profile/schema'
import { Checkbox } from '@/components/Checkbox'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { TIME_DATE_FORMAT, USER_SEARCH_TYPE_OPTIONS, USER_STATUS } from '@/constants'
import { userSelectedStatusAtom } from '@/store/user'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/Card'
import DeleteUserModal from '../DeleteUserModal'
import SearchBar from '@/components/SearchBar'
import ExportDropdown from '../ExportDropdown'
import { Button } from '@/components/Button'
import { Trash2Icon } from 'lucide-react'
import { UserStatusTabs } from '../UserStatusTabs'
import UserFilterDropdown from '../UserFilterDropdown'
import dayjs from 'dayjs'
import { ArchiveIcon, ResetIcon } from '@radix-ui/react-icons'
import { ExportCounter } from '@/components/ExportCounter'
import { SearchBarDropdown } from '@/components/SearchbarDropdown'
import PermanentDeleteModal from '../PermanentDeleteModal'

const tableHeader = [
    { name: 'Account Number' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email Address' },
    { name: 'Contact Number' },
    { name: 'Address' },
    { name: 'Birth Date' },
]

export const UserTable: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [searchVal, setSearchVal] = useState<string>('')
    const selectedUserStatus = useAtomValue(userSelectedStatusAtom)
    const usersToExport = useAtomValue(usersToExportAtom)
    const [userIdsToDelete, setUserIdsToDelete] = useAtom(userIdsToDeleteAtom)
    const [userRoleFilter, setUserRoleFilter] = useAtom(userRoleFilterAtom)
    const [userStatusFilter, setUserStatusFilter] = useAtom(userAssignStatusFilterAtom)
    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
    const [selectedOnPage, setSelectedOnPage] = useState<number[]>([])

    const [searchType, setSearchType] = useState<string>('full_name')

    const onSearchChange = (val: string) => {
        setSearchVal(val)
    }
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const selectedStatus = useAtomValue(userSelectedStatusAtom)
    const setUsersToExport = useSetAtom(usersToExportAtom)

    const navigate = useNavigate()

    const { data: users, isLoading } = useQuery({
        queryKey: [
            'usersList',
            pagination,
            selectedStatus,
            searchVal,
            userRoleFilter,
            userStatusFilter,
        ],
        queryFn: () =>
            getUsers(
                pagination,
                [selectedStatus],
                userRoleFilter !== null && userRoleFilter?.length !== 0
                    ? userRoleFilter
                    : ['superadmin', 'groupadmin'],
                userStatusFilter,
                searchVal,
                searchType,
            ),
        refetchOnWindowFocus: true,
    })

    const handleRowClick = (id: number) => {
        selectedStatus === USER_STATUS.ACTIVATED ? navigate(`/user/edit/${id}`) : null
    }

    const handleCheckboxChange = (user: ProfileType, isChecked: boolean) => {
        if (user?.id === 1) return // Exclude user with ID 1

        setUserIdsToDelete((prev) => {
            const updatedUserIds = isChecked
                ? [...(prev?.users ?? []), user?.id] // Add userId if checked
                : (prev?.users ?? []).filter((id) => id !== user?.id) // Remove userId if unchecked
            return { users: updatedUserIds } // Return updated object with 'user' key
        })

        setSelectedOnPage((prev) => {
            const updatedUserIds = isChecked
                ? [...prev, user.id] // Add userId if checked
                : prev.filter((id) => id !== user.id) // Remove userId if unchecked
            return updatedUserIds // Return updated array
        })

        const userToAddOrRemove = users?.content?.find((prevuser) => prevuser.id === user?.id)

        setUsersToExport((prevExportData: any) => {
            const updatedContent = isChecked
                ? [...(prevExportData?.content ?? []), userToAddOrRemove] // Add the full user profile to export data
                : (prevExportData?.content ?? []).filter(
                      (prevuser: ProfileType) => prevuser.id !== user.id,
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
            users?.content?.filter((u: ProfileType) => u.id !== 1).map((u: ProfileType) => u.id) ??
            []

        const updatedUserIds = isChecked
            ? [...new Set([...(userIdsToDelete?.users ?? []), ...currentPageUserIds])] // Ensure it's always an array
            : (userIdsToDelete?.users ?? []).filter((id) => !currentPageUserIds.includes(id)) // Remove only current page users

        setUserIdsToDelete({ users: updatedUserIds })

        setUsersToExport({
            content: isChecked
                ? [
                      ...new Set([
                          ...(usersToExport?.content ?? []),
                          ...(users?.content?.filter((u: ProfileType) => u.id !== 1) ?? []),
                      ]),
                  ]
                : (usersToExport?.content ?? []).filter((u) => !currentPageUserIds.includes(u.id)), // Remove only current page users
            meta: users?.meta as PaginationType,
        })
    }

    const handleResetFilter = () => {
        setUserRoleFilter(['superadmin', 'groupadmin'])
        setUserStatusFilter(null)
        setSearchVal('')
    }

    useEffect(() => {
        setSelectAllChecked(false) // Uncheck "Select All" when navigating pages
        setSelectedOnPage([])
        setUsersToExport(null)
        setUserIdsToDelete(null)
    }, [pagination, selectedStatus, searchVal, userRoleFilter, userStatusFilter])

    return (
        <>
            <div className='mb-5 flex flex-row justify-between xs:mt-1'>
                <div className='flex flex-row xs:flex-col sm:flex-col sm:gap-1 xs:gap-1 gap-5'>
                    <SearchBar
                        value={searchVal}
                        placeHolder='Search User'
                        onSearchChange={(e) => onSearchChange(e.target.value)}
                    />
                    <SearchBarDropdown
                        options={USER_SEARCH_TYPE_OPTIONS}
                        onChange={(e) => setSearchType(e)}
                        value={searchType ?? ''}
                    />
                    <div className='flex flex-row gap-1 xs:items-center xs:justify-center'>
                        <UserFilterDropdown />
                        <Button onClick={handleResetFilter} variant='outlineTwo'>
                            <ResetIcon />
                        </Button>
                    </div>
                </div>
                <div className='flex flex-row xs:flex-col xs:gap-1 sm:flex-col sm:gap-1 gap-5'>
                    {usersToExport && usersToExport?.content?.length > 0 && (
                        <ExportCounter
                            selected={usersToExport?.content?.length ?? 0}
                            limit={users?.meta?.total ?? 0}
                        />
                    )}

                    <ExportDropdown
                        isDisabled={(usersToExport && usersToExport?.content?.length === 0) ?? true}
                        employeeListData={usersToExport as UserListType}
                    />
                    <Button
                        variant='outline'
                        className='flex flex-row gap-1'
                        onClick={() => setOpen(true)}
                        disabled={
                            userIdsToDelete === null ||
                            userIdsToDelete.users?.length === 0 ||
                            userIdsToDelete === null
                        }
                    >
                        {selectedUserStatus === USER_STATUS.ACTIVATED ? 'Archive' : 'Restore'}
                        <ArchiveIcon className='h-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='flex flex-row gap-1'
                        onClick={() => setDeleteModal(true)}
                        disabled={
                            userIdsToDelete === null ||
                            userIdsToDelete.users?.length === 0 ||
                            userIdsToDelete === null
                        }
                    >
                        Delete
                        <Trash2Icon className='h-4' />
                    </Button>
                </div>
            </div>
            <Card className='bg-white w-full overflow-x-auto'>
                <CardContent className='flex flex-col mt-4'>
                    <UserStatusTabs
                        search={searchVal}
                        roles={userRoleFilter ?? []}
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
                                            'font-semibold text-bms-gray-medium text-base whitespace-nowrap xs:text-sm',
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
                                                    className='mt-[3px] xs:mt-1 sm:mt-1'
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
                                    className='text-start text-base text-bms-gray-dark cursor-pointer xs:text-sm'
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2 xs:mt-[.7rem] sm:mt-[.7rem]'>
                                        <Checkbox
                                            checked={
                                                (userIdsToDelete?.users?.includes(u.id) ||
                                                    usersToExport?.content?.includes(u)) &&
                                                u?.id !== 1
                                            } // Check if the user ID is selected
                                            onClick={
                                                () =>
                                                    handleCheckboxChange(
                                                        u,
                                                        !userIdsToDelete?.users?.includes(u.id),
                                                    ) // Toggle user ID selection
                                            }
                                            className='-mt-[.5px]'
                                            disabled={u?.id === 1}
                                        />
                                        {u.id}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(u?.id)}>
                                        {u.first_name}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(u?.id)}>
                                        {u.last_name}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(u?.id)}>
                                        {u.email}
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
            <DeleteUserModal open={open} setOpen={setOpen} />
            <PermanentDeleteModal open={deleteModal} setOpen={setDeleteModal} />
        </>
    )
}
