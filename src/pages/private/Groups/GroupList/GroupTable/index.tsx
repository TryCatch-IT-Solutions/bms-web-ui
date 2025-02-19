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
import { GroupType } from '@/api/group/schema'
import { SyncNotificationBar } from '@/components/SyncNofificationBar'
import { ExportCounter } from '@/components/ExportCounter'

const tableHeader = [
    { name: 'Group ID' },
    { name: 'Name' },
    { name: 'Device Count' },
    { name: 'Group Admin' },
]

export const GroupTable: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [groupsToRemove, setGroupsToRemove] = useAtom(groupsToDeleteAtom)
    const [searchVal, setSearchVal] = useState<string>('')

    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
    const [selectedOnPage, setSelectedOnPage] = useState<number[]>([])

    const navigate = useNavigate()
    const [pagination, setPagination] = useState<PaginationType>({
        current_page: 1,
        per_page: 10,
    })

    const handleCheckBoxClick = (id: number, checked: boolean) => {
        setGroupsToRemove((prev) => {
            const updatedGroups = checked
                ? prev?.groups?.filter((gId) => gId !== id) || []
                : [...(prev?.groups || []), id]

            return { groups: updatedGroups }
        })

        setSelectedOnPage((prev) => {
            const updatedSelected = checked
                ? prev.filter((gId) => gId !== id) // Remove if unchecked
                : [...prev, id] // Add if checked
            return updatedSelected
        })
    }

    const handleRowClick = (id: number) => {
        navigate(`/group/edit/${id}`)
    }

    const { data: groups, isLoading } = useQuery({
        queryKey: ['groupList', pagination, searchVal],
        queryFn: () => getGroups(pagination, searchVal),
    })

    const handleCheckAll = (isChecked: boolean) => {
        setSelectAllChecked(isChecked)

        const currentPageGroupIds = groups?.content?.map((g: GroupType) => g.id) ?? []

        const updatedGroupIds = isChecked
            ? [...new Set([...(groupsToRemove?.groups ?? []), ...currentPageGroupIds])] // Ensure unique selection
            : (groupsToRemove?.groups ?? []).filter((id) => !currentPageGroupIds.includes(id)) // Remove only current page groups

        setGroupsToRemove({ groups: updatedGroupIds })
    }

    const onSearchChange = (val: string) => {
        setTimeout(() => {
            setSearchVal(val)
        }, 500)
    }

    useEffect(() => {
        setGroupsToRemove(null)
    }, [])

    useEffect(() => {
        setSelectAllChecked(false) // Uncheck "Select All" when navigating pages
        setSelectedOnPage([])
    }, [pagination])

    return (
        <>
            <div className='mb-5 flex flex-row justify-between xs:mt-1'>
                <SearchBar
                    placeHolder='Search User'
                    onSearchChange={(e) => onSearchChange(e?.target?.value)}
                />
                <div className='flex flex-row gap-5'>
                    {groupsToRemove && groupsToRemove?.groups.length > 0 && (
                        <ExportCounter
                            selected={groupsToRemove?.groups?.length}
                            limit={groups?.meta?.total ?? 0}
                        />
                    )}
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
                </div>
            </div>
            <Card>
                <CardContent className='flex flex-col items-center justify-center gap-5 mt-5'>
                    <SyncNotificationBar />
                    <Table className='table-auto whitespace-normal w-full'>
                        <TableHeader style={{ marginBottom: '10px' }}>
                            <TableRow>
                                {tableHeader.map((header, index) => (
                                    <TableHead
                                        key={index}
                                        className={cn(
                                            'font-semibold text-bms-gray-medium text-base whitespace-nowrap xs:text-sm',
                                        )}
                                    >
                                        <span className='flex flex-row gap-2 items-center'>
                                            {index === 0 && (
                                                <Checkbox
                                                    checked={
                                                        selectAllChecked ||
                                                        ((selectedOnPage?.length ?? 0) ===
                                                            groups?.content?.length &&
                                                            groups?.content?.length > 0)
                                                    }
                                                    onCheckedChange={(checked) => {
                                                        handleCheckAll(checked as boolean)
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
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <AppSkeletonLoadingState />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                groups?.content.map((g) => (
                                    <TableRow
                                        key={0}
                                        className='text-start text-base text-bms-gray-dark cursor-pointer xs:text-sm'
                                    >
                                        <TableCell className='font-semibold text-bms-link flex flex-row items-center gap-2'>
                                            <Checkbox
                                                checked={groupsToRemove?.groups?.includes(g.id)}
                                                onClick={() =>
                                                    handleCheckBoxClick(
                                                        g.id,
                                                        groupsToRemove?.groups?.includes(
                                                            g.id,
                                                        ) as boolean,
                                                    )
                                                }
                                                className='-mt-[2px]'
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
                                            {g?.group_admin?.first_name} {g?.group_admin?.last_name}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <div className='mt-5'>
                <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    total={groups?.meta.total ?? 0}
                    per_page={pagination.per_page ?? 10}
                />
            </div>
            <DeleteGroupModal open={open} setOpen={setOpen} />
        </>
    )
}
