import { cn } from '@/utils/helper'
import { Input } from '../Input'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { twMerge } from 'tailwind-merge'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
interface IAppColorPickerProps {
    className?: string
    name?: string
    value?: MyOption
    disabled?: boolean
    onChange: (value: MyOption) => void
    placeHolder?: string
}

export type MyOption = {
    label: string
    value: string
}
const hexColorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
const ColorPicker: React.FunctionComponent<IAppColorPickerProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [selectedColor, setSelectedColor] = useState(props?.value)
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
    const [, setHexColorInInput] = useState<string>(props.value?.value ?? '')
    const testStringIfHex = (string: string) => hexColorPattern.test(string)

    const handleChange = (newValue: MyOption) => {
        setHexColorInInput(newValue.value)
        if (testStringIfHex(newValue.label) && testStringIfHex(newValue.value)) {
            props.onChange(newValue)
            setSelectedColor(newValue)
        } else {
            console.log('error')
        }
    }

    const handleOutsideClick = useCallback(
        (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsColorPickerOpen(false)
            }
        },
        [setIsColorPickerOpen],
    )

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [handleOutsideClick])

    const ValueContainer = useCallback(
        () => (
            <div
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                className={cn(
                    'inline-flex items-center w-[160px] h-11 border border-line py-2 border-gray-400  rounded-md pl-4 pr-1 text-base cursor-pointer',
                    isColorPickerOpen ? 'border border-zentive-green-dark' : '',
                )}
            >
                <span
                    className={cn(
                        'absolute px-1 mb-12 text-sm text-gray-500 whitespace-nowrap bg-white',
                        isColorPickerOpen ? 'text-zentive-green-dark' : '',
                    )}
                >
                    {props.placeHolder}
                </span>
                <span>{props.value?.value}</span>
                <div className='ml-3 flex justify-end items-center w-full '>
                    <div
                        style={{ backgroundColor: props.value?.value }}
                        className={
                            'flex text-center, mr-1 w-[33px] h-[33px] rounded-2xl shadow-md border ml-4'
                        }
                    />
                    {isColorPickerOpen ? (
                        <RiArrowDropUpLine className='h-5 w-5 text-gray-500 ' />
                    ) : (
                        <RiArrowDropDownLine className='h-5 w-5 text-gray-500 ' />
                    )}
                </div>
            </div>
        ),
        [selectedColor?.label, selectedColor?.value, props.value?.value, isColorPickerOpen],
    )

    return (
        <div className='relative'>
            <ValueContainer />
            <div
                className={twMerge(
                    isColorPickerOpen ? 'block absolute left-0' : 'hidden',
                    'z-20 w-full',
                )}
                ref={containerRef}
            >
                <div className='shadow-lg bg-white rounded-sm'>
                    <Input type='text' name='hex' value={props.value?.value} />
                    <HexColorPicker
                        style={{ width: '100%', height: '150px' }}
                        onChange={(hex) => handleChange({ label: hex, value: hex })}
                        defaultValue={props.value?.value}
                    />
                </div>
            </div>
        </div>
    )
}

export default ColorPicker
