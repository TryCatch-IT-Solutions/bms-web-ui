import { getDeviceList } from '@/api/device'
import { DeviceType } from '@/api/device/schema'
import { Button } from '@/components/Button'
import { Card, CardContent } from '@/components/Card'
import { Checkbox } from '@/components/Checkbox'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import SearchBar from '@/components/SearchBar'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { deleteDeviceAtom, groupFilterAtom } from '@/store/device'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteDeviceModal from '../DeleteDeviceModal'
import { DeviceFilterByGroupModal } from './DeviceFilterByGroupModal'

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

    const [devicesToDelete, setDevicesToDelete] = useAtom(deleteDeviceAtom)
    const [groupFilter, setGroupFilter] = useState<boolean>(false)
    const [searchVal, setSearchVal] = useState<string>('')
    const deviceGroupFilter = useAtomValue(groupFilterAtom)

    const [open, setOpen] = useState<boolean>(false)
    const onSearchChange = (val: string) => {
        setSearchVal(val)
    }

    const navigate = useNavigate()

    const { data: devices, isLoading } = useQuery({
        queryKey: ['deviceList', pagination, searchVal, deviceGroupFilter],
        queryFn: () => getDeviceList(pagination, searchVal, deviceGroupFilter ?? 0),
    })

    const handleRowClick = (id: number) => {
        navigate(`/device/edit/${id}`)
    }

    const handleCheckboxChange = (deviceId: number, isChecked: boolean) => {
        setDevicesToDelete((prev) => {
            const updatedDeviceIds = isChecked
                ? [...(prev?.devices ?? []), deviceId] // Add userId if checked
                : (prev?.devices ?? []).filter((id) => id !== deviceId) // Remove userId if unchecked
            return { devices: updatedDeviceIds } // Return updated object with 'user' key
        })
    }

    return (
        <>
            <div className='mb-5 flex flex-row justify-between'>
                <SearchBar
                    placeHolder='Search Device'
                    onSearchChange={(e) => onSearchChange(e?.target?.value)}
                />
                <div className='flex flex-row gap-5'>
                    <Button
                        variant='outline'
                        className='flex flex-row gap-1'
                        onClick={() => setOpen(true)}
                    >
                        Delete
                        <Trash2Icon className='h-4' />
                    </Button>
                    <Button type='button' onClick={() => setGroupFilter(true)}>
                        Filter By Group
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
                                        <span className='flex flex-row items-center gap-2'>
                                            {index === 0 && (
                                                <Checkbox
                                                    checked={
                                                        devicesToDelete?.devices?.length ===
                                                        devices?.content?.length
                                                    }
                                                    onClick={() => {
                                                        if (
                                                            devicesToDelete?.devices?.length ===
                                                            devices?.content?.length
                                                        ) {
                                                            setDevicesToDelete({ devices: [] })
                                                        } else {
                                                            setDevicesToDelete({
                                                                devices:
                                                                    devices?.content?.map(
                                                                        (d: DeviceType) => d.id,
                                                                    ) ?? [],
                                                            })
                                                        }
                                                    }}
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
                            {isLoading && (
                                <TableRow
                                    key={0}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell colSpan={7}>
                                        <AppSkeletonLoadingState />
                                    </TableCell>
                                </TableRow>
                            )}
                            {devices?.content?.map((d: DeviceType) => (
                                <TableRow
                                    key={d?.id}
                                    className='text-start text-base text-bms-gray-dark cursor-pointer'
                                >
                                    <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2'>
                                        <Checkbox
                                            checked={devicesToDelete?.devices?.includes(d?.id)}
                                            onClick={
                                                () =>
                                                    handleCheckboxChange(
                                                        d.id,
                                                        !devicesToDelete?.devices?.includes(d?.id),
                                                    ) // Toggle user ID selection
                                            }
                                            className='-mt-[2px]'
                                        />
                                        {d.id}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(d?.id)}>
                                        {d.group_id}
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(d?.id)}>
                                        {d.model}
                                    </TableCell>
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
                </CardContent>
            </Card>
            <DeleteDeviceModal open={open} setOpen={setOpen} />
            <DeviceFilterByGroupModal open={groupFilter} setOpen={setGroupFilter} />
        </>
    )
}
