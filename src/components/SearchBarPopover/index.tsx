import React, { useState, useEffect, useRef } from 'react'
import SearchBar from '@/components/InputSearchBox'

interface SearchBarPopoverProps {
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    children: React.ReactNode
}

const SearchBarPopover: React.FC<SearchBarPopoverProps> = ({ onSearchChange, children }) => {
    const [isFocused, setIsFocused] = useState(false)
    const searchBarRef = useRef<HTMLDivElement>(null)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setIsFocused(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const limitedChildren = React.Children.toArray(children).slice(0, 5)

    return (
        <div className='relative' ref={searchBarRef}>
            <div className='font-light' onClick={handleFocus}>
                <SearchBar
                    className='w-[331px] h-[45px] py-2 pl-10 pr-4 border border-zentive-black rounded-l-[2px] focus:outline-none'
                    onSearchChange={onSearchChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            {isFocused && (
                <div className='absolute z-10 top-full left-0 bg-white shadow-md max-h-60 overflow-y-auto cursor-pointer mt-2'>
                    {limitedChildren?.map((child) => (
                        <div className='h-[34px] w-[331px] flex items-center hover:bg-zentive-gray-bg pl-4'>
                            {child}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchBarPopover
