import { Card, CardContent } from '@/components/Card'
import { EmployeeStatusBar } from './EmployeeStatusBar'
import { EmployeeTable } from './EmployeeTable'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/Button'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import DeleteEmployeeModal from './DeleteEmployeeModal'
import { useAtomValue } from 'jotai'
import { employeeSelectedStatusAtom } from '@/store/user'
import { USER_STATUS } from '@/constants'

export const EmployeeList: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const selectedStatus = useAtomValue(employeeSelectedStatusAtom)

    const onSearchChange = (val: string) => {
        console.log(val)
    }

    return (
        <div className='content'>
            <BreadCrumbs title='Employee List' origin='Employees' />
            <div className='mb-5 flex flex-row justify-between'>
                <SearchBar placeHolder='Search User' onSearchChange={() => onSearchChange} />
                <div className='flex flex-row gap-5'>
                    <Button
                        variant='outline'
                        className='flex flex-row gap-1'
                        onClick={() => setOpen(true)}
                    >
                        {selectedStatus === USER_STATUS.ACTIVATED ? 'Delete' : 'Restore'}
                        <Trash2Icon className='h-4' />
                    </Button>
                    <Button>Filter</Button>
                </div>
            </div>
            <Card className='bg-white w-full overflow-x-auto'>
                <CardContent className='mt-4'>
                    <EmployeeStatusBar />
                    <EmployeeTable />
                </CardContent>
            </Card>
            <DeleteEmployeeModal open={open} setOpen={setOpen} />
        </div>
    )
}
