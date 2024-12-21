import { userIdsToDeleteAtom, usersToExportAtom } from '@/store/user'
import { getUsers } from '@/api/profile'
import { ProfileType } from '@/api/profile/schema'
import { Checkbox } from '@/components/Checkbox'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { ROLE } from '@/constants'
import { userSelectedStatusAtom } from '@/store/user'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 20,
        itemsPerPage: 20,
    })

    const selectedStatus = useAtomValue(userSelectedStatusAtom)
    const [userIdsToDelete, setUserIdsToDelete] = useAtom(userIdsToDeleteAtom)
    const setUsersToExport = useSetAtom(usersToExportAtom)

    const navigate = useNavigate()

    const { data: users, isLoading } = useQuery({
        queryKey: ['usersList', pagination, selectedStatus],
        queryFn: () =>
            getUsers(pagination, [selectedStatus], [ROLE.superadmin, ROLE.groupadmin], true),
    })

    const handleRowClick = (id: number) => {
        navigate(`/user/edit/${id}`)
    }

    const handleCheckboxChange = (user: ProfileType, isChecked: boolean) => {
        setUserIdsToDelete((prev) => {
            const updatedUserIds = isChecked
                ? [...(prev?.users ?? []), user?.id] // Add userId if checked
                : (prev?.users ?? []).filter((id) => id !== user?.id) // Remove userId if unchecked
            return { users: updatedUserIds } // Return updated object with 'user' key
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

    return (
        <>
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
                    {users?.content?.map((u: ProfileType) => (
                        <TableRow
                            key={u?.id}
                            className='text-start text-base text-bms-gray-dark cursor-pointer'
                        >
                            <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                                <Checkbox
                                    checked={userIdsToDelete?.users?.includes(u.id)} // Check if the user ID is selected
                                    onClick={
                                        () =>
                                            handleCheckboxChange(
                                                u,
                                                !userIdsToDelete?.users?.includes(u.id),
                                            ) // Toggle user ID selection
                                    }
                                />
                                <Link to={'/user/edit'}>{u.id}</Link>
                            </TableCell>
                            <TableCell onClick={() => handleRowClick(u?.id)}>
                                {u.first_name}
                            </TableCell>
                            <TableCell onClick={() => handleRowClick(u?.id)}>
                                {u.last_name}
                            </TableCell>
                            <TableCell onClick={() => handleRowClick(u?.id)}>{u.email}</TableCell>
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
                                {u.birth_date}
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
        </>
    )
}
