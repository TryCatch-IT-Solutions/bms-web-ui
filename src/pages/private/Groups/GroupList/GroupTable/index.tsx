import { Checkbox } from '@/components/Checkbox'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import { cn } from '@/utils/helper'
import { useNavigate } from 'react-router-dom'

const tableHeader = [{ name: 'Group ID' }, { name: 'Name' }]

export const GroupTable: React.FC = () => {
    const navigate = useNavigate()

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
                    className='text-start text-base text-bms-gray-dark'
                    onClick={() => navigate('/user/edit')}
                >
                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                        <Checkbox /> 0001
                    </TableCell>
                    <TableCell>Jane</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
