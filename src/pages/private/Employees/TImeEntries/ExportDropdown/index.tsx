import { useState, useEffect, useRef } from 'react'
import { Menu } from '@headlessui/react'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '@/utils/helper'
import ExportEmployeeCSV from './ExportCSV'
import ExportEmployeePDF from './ExportPDF/ExportPDFButton'
import { TimeEntriesListType } from '@/api/profile/schema'

interface IExportDropdown {
    timeEntries?: TimeEntriesListType
    isDisabled: boolean
}

const ExportDropdown = ({ timeEntries, isDisabled }: IExportDropdown) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)

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

    return (
        <div ref={menuRef} className='relative inline-block text-left'>
            <Menu>
                <Menu.Button
                    className={cn(
                        'w-[105px] h-[43px] text-base text-center font-semibold flex justify-center items-center gap-x-1.5 rounded-[4px] ring-2 ring-inset',
                        !isDisabled
                            ? isOpen
                                ? 'bg-white text-black ring-[#00000029]'
                                : 'bg-transparent text-bms-gray-medium ring-bms-gray-dark'
                            : 'bg-[#00000029] text-black ring-[#00000029] cursor-not-allowed',
                    )}
                    disabled={isDisabled}
                    onClick={onOpenMenu}
                >
                    Export
                    <FiChevronDown className='-mr-1 h-5 w-5 text-gray-400' aria-hidden='true' />
                </Menu.Button>

                {isOpen && (
                    <div className='mt-2 w-[150px] h-auto absolute right-0 z-10 origin-top-right rounded-md bg-white shadow-lg focus:outline-none'>
                        <div className='flex flex-col w-full rounded-md'>
                            <ExportEmployeePDF timeEntries={timeEntries} />
                            <ExportEmployeeCSV timeEntries={timeEntries} />
                        </div>
                    </div>
                )}
            </Menu>
        </div>
    )
}

export default ExportDropdown
