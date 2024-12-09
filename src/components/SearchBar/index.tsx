import React, { useEffect, useRef, ChangeEvent } from 'react'
import { CiSearch } from 'react-icons/ci'
import { cn } from '@/utils/helper'
import { IoCloseCircle } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'

interface SearchBarProps {
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
    value?: string
    disabled?: boolean
    className?: string
    onFocus?: () => void
    onBlur?: () => void
    placeHolder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearchChange,
    value,
    disabled,
    className,
    placeHolder,
}) => {
    // const { t } = useTranslation(['jobs'])
    const input = useRef<HTMLInputElement | null>(null)
    const { pathname } = useLocation()

    useEffect(() => {
        if (input.current) {
            input.current.value = value || ''
        }
    }, [value])

    const handleClear = () => {
        if (input.current) {
            input.current.value = ''
            const event = {
                target: input.current,
            } as ChangeEvent<HTMLInputElement>
            onSearchChange(event)
        }
    }

    return (
        <div className='w-[304px] h-[35px] flex items-center'>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-2'>
                    <CiSearch size={16} />
                </div>
                <input
                    ref={input}
                    type='text'
                    placeholder={placeHolder}
                    value={value}
                    disabled={disabled}
                    onChange={onSearchChange}
                    className={
                        !className
                            ? cn(
                                  'w-[204px] h-[35px] py-2 pl-10 pr-4 border border-gray-300 rounded-l-[2px] focus:outline-none',
                              )
                            : className
                    }
                />
                {pathname === '/crew/jobs/search' && value !== '' && (
                    <span className='absolute right-2 top-3'>
                        <IoCloseCircle className='w-5 h-5 text-gray-600' onClick={handleClear} />
                    </span>
                )}
            </div>
        </div>
    )
}

export default SearchBar
