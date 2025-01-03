import { ProfileType } from '@/api/profile/schema'
import { Card, CardContent } from '@/components/Card'
import { Checkbox } from '@/components/Checkbox'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import { employeeGroupToRemoveAtom } from '@/store/groups'
import { cn } from '@/utils/helper'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const tableHeader = [
    { name: 'Account Number' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email Address' },
    { name: 'Contact Number' },
    { name: 'Address' },
]

interface EditGroupMemberTableProps {
    employees: ProfileType[]
}

export const GroupMemberTable: React.FC<EditGroupMemberTableProps> = ({ employees }) => {
    const [empToRemove, setEmpToRemove] = useAtom(employeeGroupToRemoveAtom)

    const handleCheckBoxClick = (id: number, checked: boolean) => {
        setEmpToRemove((prev) => {
            const updatedEmployees = checked
                ? prev?.employees?.filter((empId) => empId !== id) || []
                : [...(prev?.employees || []), id]

            return { employees: updatedEmployees }
        })
    }

    useEffect(() => {
        setEmpToRemove(null)
    }, [])

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
                        {employees?.map((e) => (
                            <TableRow
                                key={e.id}
                                className='text-start text-base text-bms-gray-dark cursor-pointer'
                            >
                                <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                                    <Checkbox
                                        onClick={() =>
                                            handleCheckBoxClick(
                                                e.id,
                                                empToRemove?.employees?.includes(e.id) ?? false,
                                            )
                                        }
                                    />{' '}
                                    {e.id}
                                </TableCell>
                                <TableCell>{e.first_name}</TableCell>
                                <TableCell>{e.last_name}</TableCell>
                                <TableCell>{e.email}</TableCell>
                                <TableCell>{e.phone_number}</TableCell>
                                <TableCell>
                                    <p className='w-40 truncate'>
                                        {e.address1} {e.address2 ? e.address2 + ',' : ','}{' '}
                                        {e.municipality}, {e.province}
                                    </p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}