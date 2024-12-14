import { getDeviceList } from '@/api/device'
import { DeviceType } from '@/api/device/schema'
import { Checkbox } from '@/components/Checkbox'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const tableHeader = [
    { name: 'Device ID' },
    { name: 'Group' },
    { name: 'Model' },
    { name: 'Serial Number' },
]

export const DeviceTable: React.FC = () => {
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 20,
        itemsPerPage: 20,
    })

    const navigate = useNavigate()

    const { data: devices, isLoading } = useQuery({
        queryKey: ['deviceList', pagination],
        queryFn: getDeviceList,
    })

    console.log(devices)

    const handleRowClick = (id: number) => {
        navigate(`/device/edit/${id}`)
    }

    const handleCheckboxChange = (userId: number, isChecked: boolean) => {
        console.log(userId, isChecked)
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
                            <TableCell rowSpan={7}>
                                <AppSkeletonLoadingState />
                            </TableCell>
                        </TableRow>
                    )}
                    {devices?.data?.map((d: DeviceType) => (
                        <TableRow
                            key={d?.id}
                            className='text-start text-base text-bms-gray-dark cursor-pointer'
                        >
                            <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                                <Checkbox
                                    onClick={
                                        () => handleCheckboxChange(d.id, false) // Toggle user ID selection
                                    }
                                />
                                <Link to={'/user/edit'}>{d.id}</Link>
                            </TableCell>
                            <TableCell onClick={() => handleRowClick(d?.id)}>
                                {d.group_id}
                            </TableCell>
                            <TableCell onClick={() => handleRowClick(d?.id)}>{d.model}</TableCell>
                            <TableCell onClick={() => handleRowClick(d?.id)}>
                                {d.serial_no}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination
                pagination={pagination}
                setPagination={setPagination}
                total={devices?.meta.total ?? 0}
                per_page={20}
            />
        </>
    )
}
