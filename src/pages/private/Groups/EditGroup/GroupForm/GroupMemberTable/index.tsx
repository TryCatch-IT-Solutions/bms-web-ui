import { ProfileType } from '@/api/profile/schema'
import { Card, CardContent } from '@/components/Card'
import { Checkbox } from '@/components/Checkbox'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import { employeeGroupToRemoveAtom } from '@/store/groups'
import { cn } from '@/utils/helper'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

    const navigate = useNavigate()

    const handleCheckBoxClick = (id: number, checked: boolean) => {
        setEmpToRemove((prev) => {
            const updatedEmployees = checked
                ? prev?.employees?.filter((empId) => empId !== id) || []
                : [...(prev?.employees || []), id]

            return { employees: updatedEmployees }
        })
    }

    const handleCheckAll = (checked: boolean) => {
        setEmpToRemove(() => {
            const updatedEmployees = checked ? employees.map((e) => e.id) : []
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
                                    <span className='flex flex-row gap-2 items-center'>
                                        {index === 0 && (
                                            <Checkbox
                                                checked={
                                                    empToRemove?.employees?.length ===
                                                    employees?.length
                                                }
                                                onCheckedChange={() =>
                                                    handleCheckAll(
                                                        empToRemove?.employees?.length !==
                                                            employees?.length,
                                                    )
                                                }
                                                className='-mt-[2px]'
                                            />
                                        )}
                                        {header.name}
                                    </span>
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
                                <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2'>
                                    <Checkbox
                                        onClick={() =>
                                            handleCheckBoxClick(
                                                e.id,
                                                empToRemove?.employees?.includes(e.id) ?? false,
                                            )
                                        }
                                        checked={empToRemove?.employees?.includes(e.id)}
                                        className='-mt-[2px]'
                                    />{' '}
                                    {e.id}
                                </TableCell>
                                <TableCell onClick={() => navigate(`/employee/edit/${e.id}`)}>
                                    {e.first_name}
                                </TableCell>
                                <TableCell onClick={() => navigate(`/employee/edit/${e.id}`)}>
                                    {e.last_name}
                                </TableCell>
                                <TableCell onClick={() => navigate(`/employee/edit/${e.id}`)}>
                                    {e.email}
                                </TableCell>
                                <TableCell onClick={() => navigate(`/employee/edit/${e.id}`)}>
                                    {e.phone_number}
                                </TableCell>
                                <TableCell onClick={() => navigate(`/employee/edit/${e.id}`)}>
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
