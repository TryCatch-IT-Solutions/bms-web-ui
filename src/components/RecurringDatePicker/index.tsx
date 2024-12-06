import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import dayjs from 'dayjs'
import { US_FORMAT } from '@/constants'
import { SelectSingleEventHandler } from 'react-day-picker'
import { Label } from '@/components/Label'

type RecurringDatePickerProps = {
    startDate: string
    setStartDate: SelectSingleEventHandler
}

export const RecurringDatePicker = ({ setStartDate, startDate }: RecurringDatePickerProps) => {
    const startDateUSFormat = dayjs(startDate).format(US_FORMAT)

    const startDateObject = new Date(startDate)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className='relative'>
                    <div
                        role='button'
                        className='bg-white relative w-full  flex flex-row h-11 justify-center items-center text-left font-normal text-zentive-black border border-gray-400 rounded-sm'
                    >
                        <CalendarIcon className='h-4 w-4 absolute left-3' />
                        {startDateUSFormat}
                    </div>

                    <Label className='floating-label absolute left-3 top-1/2 -translate-y-[2.15rem] px-1 text-sm text-zentive-gray-medium  split-color pointer-events-none'>
                        Date
                    </Label>
                </div>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0 flex flex-row'>
                <Calendar
                    mode='single'
                    defaultMonth={startDateObject}
                    selected={startDateObject}
                    onSelect={setStartDate}
                />
            </PopoverContent>
        </Popover>
    )
}
