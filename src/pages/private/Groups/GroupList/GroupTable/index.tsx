import { getGroups } from '@/api/group'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Pagination } from '@/components/Pagination'
import { PaginationType } from '@/components/Pagination/schema'
import SearchBar from '@/components/SearchBar'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/Table'
import AppSkeletonLoadingState from '@/components/TableLoadingState'
import { cn } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteGroupModal from '../DeleteGroupModal'
import { Card, CardContent } from '@/components/Card'
import { groupsToDeleteAtom } from '@/store/groups'
import { useAtom } from 'jotai'

const tableHeader = [
    { name: 'Group ID' },
    { name: 'Name' },
    { name: 'Device Count' },
    { name: 'Group Admin' },
]

export const GroupTable: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [groupsToRemove, setGroupsToRemove] = useAtom(groupsToDeleteAtom)

    const navigate = useNavigate()
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 20,
        itemsPerPage: 20,
    })

    const handleCheckBoxClick = (id: number, checked: boolean) => {
        setGroupsToRemove((prev) => {
            const updatedGroups = checked
                ? prev?.groups?.filter((gId) => gId !== id) || []
                : [...(prev?.groups || []), id]

            return { groups: updatedGroups }
        })
    }

    const handleRowClick = (id: number) => {
        navigate(`/group/edit/${id}`)
    }

    const { data: groups, isLoading } = useQuery({
        queryKey: ['groupList', pagination],
        queryFn: () => getGroups(pagination),
    })

    useEffect(() => {
        setGroupsToRemove(null)
    }, [])

    const onSearchChange = (val: string) => {
        console.log(val)
    }

    return (
        <>
            <div className='mb-5 flex flex-row justify-between'>
                <SearchBar placeHolder='Search User' onSearchChange={() => onSearchChange} />
                <div className='flex flex-row gap-5'>
                    <Button
                        variant='outline'
                        className='flex flex-row gap-1'
                        onClick={() => setOpen(true)}
                        disabled={
                            !(groupsToRemove && groupsToRemove?.groups?.length > 0) as boolean
                        }
                    >
                        Delete
                        <Trash2Icon className='h-4' />
                    </Button>
                    <Button>Filter</Button>
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
                            {isLoading ? (
                                <AppSkeletonLoadingState />
                            ) : (
                                groups?.content.map((g) => (
                                    <TableRow
                                        key={0}
                                        className='text-start text-base text-bms-gray-dark cursor-pointer'
                                    >
                                        <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-1'>
                                            <Checkbox
                                                checked={
                                                    groupsToRemove?.groups?.includes(g.id) ?? false
                                                }
                                                onClick={() =>
                                                    handleCheckBoxClick(
                                                        g.id,
                                                        groupsToRemove?.groups?.includes(
                                                            g.id,
                                                        ) as boolean,
                                                    )
                                                }
                                            />{' '}
                                            {g.id}
                                        </TableCell>
                                        <TableCell onClick={() => handleRowClick(g.id)}>
                                            {g.name}
                                        </TableCell>
                                        <TableCell onClick={() => handleRowClick(g.id)}>
                                            {g.devices_count}
                                        </TableCell>
                                        <TableCell onClick={() => handleRowClick(g.id)}>
                                            {g.group_admin.first_name} {g.group_admin.last_name}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <Pagination
                        pagination={pagination}
                        setPagination={setPagination}
                        total={groups?.meta.total ?? 0}
                        per_page={20}
                    />
                </CardContent>
            </Card>
            <DeleteGroupModal open={open} setOpen={setOpen} />
        </>
    )
}
