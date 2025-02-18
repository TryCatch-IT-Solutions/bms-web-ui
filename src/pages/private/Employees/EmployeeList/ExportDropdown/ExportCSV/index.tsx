import React from 'react'
import { CSVLink } from 'react-csv'
import dayjs from 'dayjs'
import { E164Number } from 'libphonenumber-js/core'
import { formatPhoneNumber } from 'react-phone-number-input'
import { UserListType } from '@/api/profile/schema'
import { useSetAtom } from 'jotai'
import { employeeExportAtom, employeesToDeleteAtom } from '@/store/user'
import { TIME_DATE_FORMAT } from '@/constants'

interface IExportDataToCSV {
    employee_number: string
    first_name: string
    midle_name: string
    last_name: string
    email: string
    phone_number: string
    gender: string
    role: string
    birth_date: string
    address1: string
    address2: string
    barangay: string
    municipality: string
    province: string
    zip_code: string
    emergency_contact_name: string
    emergency_contact_number: string
}

const ExportEmployeeCSV = ({
    isOpen,
    setIsOpen,
    employeeListData,
}: {
    isOpen?: boolean
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
    employeeListData?: UserListType
}) => {
    const setEmployeeExportAtom = useSetAtom(employeeExportAtom)
    const setUserIdsToDelete = useSetAtom(employeesToDeleteAtom)

    const tableData: IExportDataToCSV[] | null =
        (employeeListData &&
            (employeeListData.content?.map((employee) => {
                return {
                    employee_number: employee.id + '',
                    first_name: employee.first_name,
                    midle_name: employee.middle_name ?? '', // Handle optional middle name
                    last_name: employee.last_name,
                    email: employee.email,
                    phone_number: `${
                        employee.phone_number.startsWith('+6')
                            ? `+6${formatPhoneNumber(
                                  ('+63' + employee.phone_number.substring(2)) as E164Number,
                              )
                                  .replace('0', '')
                                  .replace(' ', '-')}` // Format phone number for Philippines
                            : `(${employee.phone_number.substring(0, 3)})-${formatPhoneNumber(
                                  employee.phone_number as E164Number,
                              )
                                  .replace('0', ' ')
                                  .replace(' ', '-')}` // Format phone number for others
                    }`,
                    gender: employee.gender,
                    role: employee.role,
                    birth_date: dayjs(employee.birth_date).format(
                        TIME_DATE_FORMAT.EXPORT_DATE_TIME,
                    ), // Format birth date
                    address1: employee.address1,
                    address2: employee.address2 ?? '', // Handle optional address2
                    barangay: employee.barangay,
                    municipality: employee.municipality,
                    province: employee.province,
                    zip_code: employee.zip_code,
                    emergency_contact_name: employee.emergency_contact_name,
                    emergency_contact_number: `${
                        employee.emergency_contact_no?.startsWith('+6')
                            ? `+6${formatPhoneNumber(
                                  ('+63' +
                                      employee.emergency_contact_no.substring(2)) as E164Number,
                              )
                                  .replace('0', ' ')
                                  .replace(' ', '-')}` // Format emergency contact number for Philippines
                            : `(${employee.emergency_contact_no?.substring(
                                  0,
                                  3,
                              )})-${formatPhoneNumber(employee.emergency_contact_no as E164Number)
                                  .replace('0', ' ')
                                  .replace(' ', '-')}` // Format emergency contact number for others
                    }`,
                }
            }) as IExportDataToCSV[])) ||
        null

    if (!tableData) return

    // Updated CSV Headers reflecting the full details
    const csvHeaders = [
        'Employee Number',
        'First Name',
        'Middle Name',
        'Last Name',
        'Email Address',
        'Phone Number',
        'Gender',
        'Role',
        'Birth Date',
        'Address 1',
        'Address 2',
        'Barangay',
        'Municipality',
        'Province',
        'Zip Code',
        'Emergency Contact Name',
        'Emergency Contact Number',
    ]

    // Updated CSV Data reflecting the corresponding fields
    const csvData = tableData?.map((item) => ({
        'Employee Number': item.employee_number,
        'First Name': item.first_name,
        'Middle Name': item.midle_name,
        'Last Name': item.last_name,
        'Email Address': item.email,
        'Phone Number': item.phone_number,
        Gender: item.gender,
        Role: item.role,
        'Birth Date': item.birth_date,
        'Address 1': item.address1,
        'Address 2': item.address2,
        Barangay: item.barangay,
        Municipality: item.municipality,
        Province: item.province,
        'Zip Code': item.zip_code,
        'Emergency Contact Name': item.emergency_contact_name,
        'Emergency Contact Number': item.emergency_contact_number,
    }))

    return (
        <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={'employee-list.csv'}
            className='w-[150px] h-[34px] text-gray-dark hover:bg-gray-100 block px-5 py-1 text-base rounded-b-md text-start'
            onClick={() => {
                setIsOpen && setIsOpen(!isOpen)
                setEmployeeExportAtom(null)
                setUserIdsToDelete(null)
            }}
        >
            Export as CSV
        </CSVLink>
    )
}

export default ExportEmployeeCSV
