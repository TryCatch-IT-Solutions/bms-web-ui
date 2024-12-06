import { useState, useEffect, useRef } from 'react'
import { Menu } from '@headlessui/react'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { useSetAtom } from 'jotai'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectedEmployeeTabAtom } from '@/store/employee'
import { manageInfoTabAtom } from '@/store/manageSubs'
import { cn } from '@/utils/helper'

interface UpdateOrDeleteProps {
    deleteNote: () => void
    profileId: string
    isDisabled?: boolean
}

const UpdateOrDelete = ({ deleteNote, profileId, isDisabled }: UpdateOrDeleteProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const setEmpSelected = useSetAtom(selectedEmployeeTabAtom)
    const setOwnerSelected = useSetAtom(manageInfoTabAtom)
    const navigate = useNavigate()
    const menuRef = useRef<HTMLDivElement>(null)

    const { pathname } = useLocation()

    const isProfileDetails = pathname === '/manage-subs/subscribers/details'

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const onOpenMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleOpenNotes = () => {
        if (pathname === '/manage-subs/subscribers' || pathname === '/manage-subs/trash') {
            setOwnerSelected('notes')
            navigate(`/manage-subs/subscribers/details?profileid=${profileId}`)
        } else {
            setEmpSelected('NOTES')
            navigate(`/schedule/employee/update/${profileId}`)
        }
    }

    return (
        <div ref={menuRef} className='relative inline-block text-left'>
            <Menu>
                <Menu.Button
                    className={'absolute top-0 right-0 justify-center text-center items-center'}
                    onClick={onOpenMenu}
                    disabled={isDisabled}
                >
                    <FaEllipsisVertical className='mt-[9px] mr-[3px]' />
                </Menu.Button>
                <Menu.Items>
                    <Menu.Item>
                        <button
                            className={
                                'w-[137px] h-[34px]  text-[#191A0A] hover:bg-[#00000029] block text-base text-start px-2 rounded-t-md'
                            }
                            onClick={() => {
                                deleteNote()
                                setIsOpen(!isOpen)
                            }}
                        >
                            Delete
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button
                            className={cn(
                                'w-[137px] h-[34px]  text-[#191A0A] hover:bg-[#00000029] block text-base text-start px-2 rounded-b-md',
                                isProfileDetails && 'hidden',
                            )}
                            onClick={handleOpenNotes}
                        >
                            Open in Notes
                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default UpdateOrDelete
