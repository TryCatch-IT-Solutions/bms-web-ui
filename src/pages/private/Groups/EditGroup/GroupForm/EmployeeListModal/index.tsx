import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { toast } from '@/hooks/useToast'
import SearchBar from '@/components/SearchBar'
import { Checkbox } from '@/components/Checkbox'

interface EmployeeListModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const EmployeeListModal: React.FC<EmployeeListModalProps> = ({ open, setOpen }) => {
    const handleSave = () => {
        setOpen(false)
        toast({
            description: 'Employees Assigned Successfully',
            variant: 'default',
        })
    }
    return (
        <Modal
            isOpen={open}
            isHideCloseButton
            onClose={() => {
                setOpen(false)
            }}
            title=''
            titleClassName=''
            containerClassName='max-w-[600px]'
        >
            <div className='flex flex-col gap-5'>
                <div className='flex gap-5 px-10'>
                    <h1 className='text-left font-semibold text-2xl text-gray-900 mt-2.5'>
                        Add Employee to Group
                    </h1>
                </div>

                <div className='px-10'>
                    <SearchBar
                        onSearchChange={(val) => console.log(val)}
                        placeHolder='Search Employee'
                    />
                </div>

                <div className='overflow-y-auto px-10 max-h-[10rem]'>
                    <ul className='flex flex-col gap-3'>
                        <li className='flex flex-row gap-2 items-center'>
                            <Checkbox />
                            Employee One
                        </li>
                        <li className='flex flex-row gap-2 items-center'>
                            <Checkbox />
                            Employee Two
                        </li>
                        <li className='flex flex-row gap-2 items-center'>
                            <Checkbox />
                            Employee Three
                        </li>
                        <li className='flex flex-row gap-2 items-center'>
                            <Checkbox />
                            Employee Four
                        </li>
                        <li className='flex flex-row gap-2 items-center'>
                            <Checkbox />
                            Employee Five
                        </li>
                        <li className='flex flex-row gap-2 items-center'>
                            <Checkbox />
                            Employee Six
                        </li>
                    </ul>
                </div>

                <div className='mt-6 flex justify-end gap-x-4 bg-gray-300 py-6 px-6'>
                    <Button
                        variant='ghost'
                        className='w-97 h-11 text-base font-semibold bg-white text-bms-primary ring-bms-primary border border-bms-primary'
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className='w-97 h-11 text-base font-semibold bg-bms-primary'
                    >
                        Add Employees
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EmployeeListModal
