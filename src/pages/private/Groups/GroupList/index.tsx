import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Button } from '@/components/Button'
import SearchBar from '@/components/SearchBar'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { GroupTable } from './GroupTable'
import { Card, CardContent } from '@/components/Card'
import DeleteGroupModal from './DeleteGroupModal'

export const GroupList: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)

    const onSearchChange = (val: string) => {
        console.log(val)
    }

    return (
        <div className='content'>
            <BreadCrumbs title='Group List' origin='Groups' />
            <div className='mb-5 flex flex-row justify-between'>
                <SearchBar placeHolder='Search User' onSearchChange={() => onSearchChange} />
                <div className='flex flex-row gap-5'>
                    <Button
                        variant='outline'
                        className='flex flex-row gap-1'
                        onClick={() => setOpen(true)}
                    >
                        Delete
                        <Trash2Icon className='h-4' />
                    </Button>
                    <Button>Filter</Button>
                </div>
            </div>
            <Card>
                <CardContent>
                    <GroupTable />
                </CardContent>
            </Card>
            <DeleteGroupModal open={open} setOpen={setOpen} />
        </div>
    )
}
