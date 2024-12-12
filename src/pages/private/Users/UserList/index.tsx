import { Card, CardContent } from '@/components/Card'
import { UserStatusTabs } from './UserStatusTabs'
import { UserTable } from './UserTable'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/Button'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import DeleteUserModal from './DeleteUserModal'
import { useAtomValue } from 'jotai'
import { userIdsToDeleteAtom } from '@/store/user'

export const UserList: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const onSearchChange = (val: string) => {
        console.log(val)
    }

    const userIdsToDelete = useAtomValue(userIdsToDeleteAtom)

    return (
        <div className='content'>
            <BreadCrumbs title='User List' origin='Users' />
            <div className='mb-5 flex flex-row justify-between'>
                <SearchBar placeHolder='Search User' onSearchChange={() => onSearchChange} />
                <div className='flex flex-row gap-5'>
                    <Button
                        variant='outline'
                        className='flex flex-row gap-1'
                        onClick={() => setOpen(true)}
                        disabled={userIdsToDelete === null || userIdsToDelete.users.length === 0}
                    >
                        Delete
                        <Trash2Icon className='h-4' />
                    </Button>
                    <Button>Filter</Button>
                </div>
            </div>
            <Card className='bg-white w-full overflow-x-auto'>
                <CardContent className='mt-4'>
                    <UserStatusTabs />
                    <UserTable />
                </CardContent>
            </Card>
            <DeleteUserModal open={open} setOpen={setOpen} />
        </div>
    )
}
