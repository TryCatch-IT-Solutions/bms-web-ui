import { useState } from 'react'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { useAtom } from 'jotai'
import { userRoleFilterAtom } from '@/store/user'
import { USER_FILTER_OPTIONS } from '@/constants'
import { BsFunnelFill } from 'react-icons/bs'

const UserFilterDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [userFilter, setuserRoleFilterAtom] = useAtom(userRoleFilterAtom)
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev)
    }

    const onRoleCheckboxChange = (value: string) => {
        const updatedFilters = userFilter?.includes(value)
            ? userFilter.filter((f) => f !== value)
            : [...(userFilter ?? []), value]

        setuserRoleFilterAtom(updatedFilters) // Apply changes immediately
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
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserFilterDropdown
