import { Checkbox } from '@/components/Checkbox'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import { cn } from '@/utils/helper'
import { Link, useNavigate } from 'react-router-dom'

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
                <TableRow
                    key={0}
                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                >
                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                        <Checkbox /> <Link to={'/group/edit'}>0001</Link>
                    </TableCell>
                    <TableCell onClick={handleRowClick}>Jane</TableCell>
                    <TableCell onClick={handleRowClick} className='text-bms-primary'>
                        DEV-004
                    </TableCell>
                    <TableCell onClick={handleRowClick}>2024 Model</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
