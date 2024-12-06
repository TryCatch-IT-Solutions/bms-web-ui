import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import dayjs from 'dayjs'
import { US_FORMAT } from '@/constants'
import { Label } from '@/components/Label'
import { SelectSingleEventHandler } from 'react-day-picker'

type OneJobDatePickerProps = {
    jobDate: string
    setJobDate: SelectSingleEventHandler
    label?: string
    showOutsideDates?: boolean
}

export const OneJobDatePicker = ({
    setJobDate,
    jobDate,
    label,
    showOutsideDates,
}: OneJobDatePickerProps) => {
    const jobDateUSFormat = dayjs(jobDate).format(US_FORMAT)
    const jobDateObject = dayjs(jobDateUSFormat).toDate()
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className='relative'>
                    <div
                        role='button'
                        className='bg-white relative w-full flex flex-row h-11 justify-center items-center text-left font-normal text-zentive-black border border-gray-400 rounded-sm'
                    >
                        <CalendarIcon className='h-4 w-4 absolute left-3' />
                        {jobDate != '' ? jobDateUSFormat : ''}
                    </div>

                    <Label className='floating-label absolute left-3 top-1/2 -translate-y-[2.15rem] px-1 text-sm text-zentive-gray-medium split-color pointer-events-none'>
                        {label ? label : 'Date'}
                    </Label>
                </div>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0 flex flex-row'>
                <Calendar
                    mode='single'
                    defaultMonth={jobDate != '' ? jobDateObject : new Date()}
                    selected={jobDate != '' ? jobDateObject : new Date()}
                    onSelect={setJobDate}
                    showOutsideDays={showOutsideDates ? showOutsideDates : false}
                />
            </PopoverContent>
        </Popover>
    )
}
