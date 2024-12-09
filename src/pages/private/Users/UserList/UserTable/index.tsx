import { Checkbox } from '@/components/Checkbox'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import { cn } from '@/utils/helper'
import { useNavigate } from 'react-router-dom'

const tableHeader = [
    { name: 'Account Number' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email Address' },
    { name: 'Contact Number' },
    { name: 'Address' },
    { name: 'Birth Date' },
    { name: 'Age' },
    { name: 'Person to Contact' },
    { name: 'Emergency Contact' },
]

export const UserTable: React.FC = () => {
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
                    <TableCell>Doe</TableCell>
                    <TableCell>jane.doe@gmail.com</TableCell>
                    <TableCell>+639452558852</TableCell>
                    <TableCell>
                        <p className='w-40 truncate'>#038 Binukawan, Bagac, Bataan 2107</p>
                    </TableCell>
                    <TableCell>May 26, 1997</TableCell>
                    <TableCell>27</TableCell>
                    <TableCell>Si Nanay mo</TableCell>
                    <TableCell>Si tatay ko</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
