import { Card, CardContent } from '@/components/Card'
import { Checkbox } from '@/components/Checkbox'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import { cn } from '@/utils/helper'

const tableHeader = [
    { name: 'Account Number' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email Address' },
    { name: 'Contact Number' },
    { name: 'Address' },
]

export const GroupMemberTable: React.FC = () => {
    return (
        <Card>
            <CardContent>
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
                                <Checkbox /> 0001
                            </TableCell>
                            <TableCell>Jane</TableCell>
                            <TableCell>Doe</TableCell>
                            <TableCell>jane.doe@gmail.com</TableCell>
                            <TableCell>+639452558852</TableCell>
                            <TableCell>
                                <p className='w-40 truncate'>#038 Binukawan, Bagac, Bataan 2107</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
