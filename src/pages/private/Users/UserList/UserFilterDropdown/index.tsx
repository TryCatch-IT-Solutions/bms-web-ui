import { useState } from 'react'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { useAtom } from 'jotai'
import { userFilterAtom } from '@/store/user'
import { USER_FILTER_OPTIONS } from '@/constants'

const UserFilterDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [userFilter, setUserFilterAtom] = useAtom(userFilterAtom)

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev)
    }

    const onCheckboxChange = (value: string) => {
        const updatedFilters = userFilter?.includes(value)
            ? userFilter.filter((f) => f !== value)
            : [...(userFilter ?? []), value]

        setUserFilterAtom(updatedFilters) // Apply changes immediately
    }

    return (
        <div className='relative inline-block text-left'>
            <div>
                <Button
                    onClick={toggleDropdown}
                    className='w-40 h-10 bg-bms-primary text-white font-semibold'
                >
                    Filter by Role
                </Button>
            </div>
            {isOpen && (
                <div className='absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                    <div className='py-1'>
                        <ul className='max-h-60 overflow-auto'>
                            {USER_FILTER_OPTIONS.map((f) => (
                                <li key={f.value} className='flex items-center px-4 py-2'>
                                    <Checkbox
                                        onClick={() => onCheckboxChange(f.value)}
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
