import { useState } from 'react'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { useAtom } from 'jotai'
import { employeeAssignStatusFilterAtom } from '@/store/user'
import { USER_ASSIGN_STATUS } from '@/constants'
import { BsFunnelFill } from 'react-icons/bs'

const UserFilterDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [userAssignedStatusFilter, setuserAssignStatusFilterAtom] = useAtom(
        employeeAssignStatusFilterAtom,
    )

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev)
    }

    const onAssignStatusCheckboxChange = (value: boolean) => {
        if (userAssignedStatusFilter === value) {
            setuserAssignStatusFilterAtom(null)
        } else {
            setuserAssignStatusFilterAtom(value)
        }
    }

    return (
        <div className='relative inline-block text-left'>
            <div>
                <Button onClick={toggleDropdown} className='bg-bms-primary text-white'>
                    <BsFunnelFill />
                </Button>
            </div>
            {isOpen && (
                <div className='absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50'>
                    <div className='py-1 bg-white'>
                        <ul className='overflow-auto bg-white'>
                            {USER_ASSIGN_STATUS.map((f) => (
                                <li key={f.label} className='flex items-center px-4 py-2 b'>
                                    <Checkbox
                                        onClick={() => onAssignStatusCheckboxChange(f.value)}
                                        checked={userAssignedStatusFilter === f.value}
                                    />
                                    <label htmlFor={f.label} className='ml-2 text-sm text-gray-700'>
                                        {f.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserFilterDropdown
