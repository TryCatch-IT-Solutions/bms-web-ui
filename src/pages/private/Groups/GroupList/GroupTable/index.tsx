import { getGroups } from '@/api/group'
import { Checkbox } from '@/components/Checkbox'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const tableHeader = [
    { name: 'Group ID' },
    { name: 'Name' },
    { name: 'Device ID' },
    { name: 'Device Model' },
]

export const GroupTable: React.FC = () => {
    const navigate = useNavigate()

    const handleRowClick = () => {
        navigate('/group/edit')
    }

    const { data: groups, isLoading } = useQuery({
        queryKey: ['groupList'],
        queryFn: getGroups,
    })

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
                {isLoading ? (
                    <AppSkeletonLoadingState />
                ) : (
                    groups?.content.map((g) => (
                        <TableRow
                            key={0}
                            className='text-start text-base text-bms-gray-dark cursor-pointer'
                        >
                            <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                                <Checkbox /> {g.id}
                            </TableCell>
                            <TableCell onClick={handleRowClick}>{g.name}</TableCell>
                            <TableCell onClick={handleRowClick} className='text-bms-primary'>
                                DEV-004
                            </TableCell>
                            <TableCell onClick={handleRowClick}>2024 Model</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
