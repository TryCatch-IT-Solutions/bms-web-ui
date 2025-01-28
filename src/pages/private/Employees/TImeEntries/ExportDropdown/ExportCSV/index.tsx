import React from 'react'
import { CSVLink } from 'react-csv'
import dayjs from 'dayjs'
import { TimeEntriesListType } from '@/api/profile/schema'
import { useSetAtom } from 'jotai'
import { employeeExportAtom, employeesToDeleteAtom } from '@/store/user'
import { formatUnderscoreString } from '@/utils/helper'
import { TIME_DATE_FORMAT } from '@/constants'

interface IExportDataToCSV {
    id: number
    first_name: string
    last_name: string
    type: string
    datetime: string
}

const ExportEmployeeCSV = ({
    isOpen = false,
    setIsOpen,
    timeEntries,
}: {
    isOpen?: boolean
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
    timeEntries?: TimeEntriesListType
}) => {
    const setEmployeeExportAtom = useSetAtom(employeeExportAtom)
    const setUserIdsToDelete = useSetAtom(employeesToDeleteAtom)

    const tableData: IExportDataToCSV[] =
        timeEntries?.content?.map((r) => ({
            id: r?.id || 0,
            first_name: r?.employee?.first_name || 'N/A',
            last_name: r?.employee?.last_name || 'N/A',
            type: formatUnderscoreString(r?.type || 'Unknown'),
            datetime: dayjs(r?.datetime).format(TIME_DATE_FORMAT.DATE_TIME),
        })) || []

    if (!tableData?.length) return null

    const csvHeaders = [
        { label: 'Record ID', key: 'id' },
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Type', key: 'type' },
        { label: 'Date', key: 'datetime' },
    ]

    return (
        <CSVLink
            data={tableData}
            headers={csvHeaders}
            filename='employee-list.csv'
            className='w-[150px] h-[34px] text-gray-dark hover:bg-gray-100 block px-5 py-1 text-base rounded-b-md text-start'
            onClick={() => {
                setIsOpen?.(!isOpen)
                setEmployeeExportAtom(null)
                setUserIdsToDelete(null)
            }}
        >
            Export as CSV
        </CSVLink>
    )
}

export default ExportEmployeeCSV
