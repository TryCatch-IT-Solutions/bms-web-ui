import { getUsers } from '@/api/profile'
import { ProfileType } from '@/api/profile/schema'
import { Checkbox } from '@/components/Checkbox'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
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
    const navigate = useNavigate()

    const { data: users, isLoading } = useQuery({
        queryKey: ['usersList'],
        queryFn: getUsers,
    })

    const handleRowClick = () => {
        navigate('/user/edit')
    }

    return (
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
                        <AppSkeletonLoadingState />
                    </TableRow>
                )}
                {users?.map((u: ProfileType) => (
                    <TableRow
                        key={0}
                        className='text-start text-base text-bms-gray-dark cursor-pointer'
                    >
                        <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                            <Checkbox /> <Link to={'/user/edit'}>{u.id}</Link>
                        </TableCell>
                        <TableCell onClick={handleRowClick}>{u.first_name}</TableCell>
                        <TableCell onClick={handleRowClick}>{u.last_name}</TableCell>
                        <TableCell onClick={handleRowClick}>{u.email}</TableCell>
                        <TableCell onClick={handleRowClick}>{u.phone_number}</TableCell>
                        <TableCell onClick={handleRowClick}>
                            <p className='w-40 truncate'>
                                {u.address1} {u.address2 ? u.address2 + ',' : ','} {u.municipality}{' '}
                                ,{u.province}
                            </p>
                        </TableCell>
                        <TableCell onClick={handleRowClick}>{u.birth_date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
