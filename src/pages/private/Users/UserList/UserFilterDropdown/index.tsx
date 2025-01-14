import { useState } from 'react'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { useAtom } from 'jotai'
import { userAssignStatusFilterAtom, userRoleFilterAtom } from '@/store/user'
import { USER_ASSIGN_STATUS, USER_FILTER_OPTIONS } from '@/constants'
import { BsFunnelFill } from 'react-icons/bs'

const UserFilterDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [userFilter, setuserRoleFilterAtom] = useAtom(userRoleFilterAtom)
    const [userAssignedStatusFilter, setuserAssignStatusFilterAtom] = useAtom(
        userAssignStatusFilterAtom,
    )

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev)
    }

    const onRoleCheckboxChange = (value: string) => {
        const updatedFilters = userFilter?.includes(value)
            ? userFilter.filter((f) => f !== value)
            : [...(userFilter ?? []), value]

        setuserRoleFilterAtom(updatedFilters) // Apply changes immediately
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
                        <p className='font-semibold flex items-center px-4 text-sm'>Role</p>
                        <ul className='overflow-auto bg-white'>
                            {USER_FILTER_OPTIONS.map((f) => (
                                <li key={f.value} className='flex items-center px-4 py-2'>
                                    <Checkbox
                                        onClick={() => onRoleCheckboxChange(f.value)}
                                        checked={userFilter?.includes(f.value)}
                                    />
                                    <label htmlFor={f.value} className='ml-2 text-sm text-gray-700'>
                                        {f.label}
                                    </label>
                                </li>
                            ))}
                            <p className='font-semibold flex items-center px-4 text-sm mt-2'>
                                Assign Status
                            </p>
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
