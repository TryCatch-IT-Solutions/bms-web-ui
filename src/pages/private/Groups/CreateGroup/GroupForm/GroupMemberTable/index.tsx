import { CreateGroupType } from '@/api/group/schema'
import { Button } from '@/components/Button'
import { Card, CardContent } from '@/components/Card'
import { Checkbox } from '@/components/Checkbox'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import { cn } from '@/utils/helper'
import { Trash2Icon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import AdminListModal from '../AdminListModal'
import { useState } from 'react'
import EmployeeListModal from '../EmployeeListModal'
import { ProfileType } from '@/api/profile/schema'

const tableHeader = [
    { name: 'Account Number' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email Address' },
    { name: 'Contact Number' },
    { name: 'Address' },
]
export const GroupMemberTable: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [groupAdminModal, setGroupAdminModal] = useState<boolean>(false)
    const { watch, setValue } = useFormContext<CreateGroupType>()
    const [empToRemove, setEmpToRemove] = useState<number[]>([])

    const empIds = watch('employees') // Array of employee IDs
    const emps = watch('employee_profiles') // Array of employee profiles
    const admin = watch('admin_profile') // Admin profile

    // Handles checkbox selection for removal
    const handleCheckboxChange = (emp: ProfileType, checked: boolean) => {
        setEmpToRemove((prev) => (checked ? [...prev, emp.id] : prev.filter((id) => id !== emp.id)))
    }

    // Handles removal of selected employees
    const handleRemove = () => {
        const updatedEmpIds = empIds.filter((id) => !empToRemove.includes(id))
        const updatedEmps = emps?.filter((emp) => !empToRemove.includes(emp.id))

        setValue('employees', updatedEmpIds)
        setValue('employee_profiles', updatedEmps as ProfileType[])

        setEmpToRemove([])
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row gap-5 items-center mt-3'>
                    <p>Group Admin: </p>
                    <Button
                        className='bg-gray-500 hover:bg-gray-400'
                        onClick={() => setGroupAdminModal(true)}
                    >
                        {admin ? admin.first_name + ' ' + admin?.last_name : 'Select Group Admin'}
                    </Button>
                </div>
                <div className='flex flex-row gap-5 mt-5'>
                    <Button
                        variant='outline'
                        className='flex flex-row gap-2'
                        onClick={handleRemove} // Call handleRemove on click
                    >
                        Remove
                        <Trash2Icon className='w-5' />
                    </Button>
                    <Button
                        onClick={() => setOpen(true)}
                        variant='outline'
                        className='flex flex-row gap-2'
                    >
                        Add Employee
                    </Button>
                </div>
            </div>
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
                            {emps?.map((e) => (
                                <TableRow
                                    key={e.id}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                                        <Checkbox
                                            checked={empToRemove.includes(e.id)}
                                            onClick={() =>
                                                handleCheckboxChange(e, !empToRemove.includes(e.id))
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
                                            {e.address1}, {e.address2 ? e.address2 + ', ' : ', '}{' '}
                                            {e.municipality}, {e.province}
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <EmployeeListModal open={open} setOpen={setOpen} />
            <AdminListModal open={groupAdminModal} setOpen={setGroupAdminModal} />
        </div>
    )
}
