import React from 'react'
import { CSVLink } from 'react-csv'
import dayjs from 'dayjs'
import { E164Number } from 'libphonenumber-js/core'
import { formatPhoneNumber } from 'react-phone-number-input'
import { UserListType } from '@/api/profile/schema'
interface IExportDataToCSV {
    employeeNumber: string
    name: string
    compensation: number
    caLicense: string
    email: string
    phoneNumber: string
    address: string
    dateOfBirth: string
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
    const tableData: IExportDataToCSV[] | null =
        (employeeListData &&
            (employeeListData.content?.map((employee) => {
                return {
                    employeeNumber: '000' + employee.id,
                    name: employee.first_name + ' ' + employee.last_name,
                    email: employee.email,
                    phoneNumber: `${
                        employee.phone_number.startsWith('+6')
                            ? `(+63)-${formatPhoneNumber(
                                  ('+63' + employee.phone_number.substring(2)) as E164Number,
                              )
                                  .replace('0', '')
                                  .replace(' ', '-')}`
                            : `(${employee.phone_number.substring(0, 3)})-${formatPhoneNumber(
                                  employee.phone_number as E164Number,
                              )
                                  .replace('0', '')
                                  .replace(' ', '-')}`
                    }`,
                    address: `${employee?.address1 + ','} ${
                        employee?.address2 !== undefined ? employee?.address2 + ', ' : ''
                    }${employee?.barangay + ','} ${
                        employee?.municipality + ','
                    } ${employee?.zip_code}`,
                    dateOfBirth: dayjs(employee.birth_date).format('MMMM DD, YYYY'),
                }
            }) as IExportDataToCSV[])) ||
        null

    if (!tableData) return

    const csvHeaders = [
        'Employee Number',
        'Name',
        'Email Address',
        'Address',
        'Phone Number',
        'Date of Birth',
    ]

    const csvData = tableData?.map((item) => ({
        'Employee Number': item.employeeNumber,
        Name: item.name,
        'Email Address': item.email,
        Address: item.address,
        'Phone Number': item.phoneNumber,
        'Date of Birth': item.dateOfBirth,
    }))

    return (
        <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={'employee-list.csv'}
            className={
                'w-[150px] h-[34px] text-gray-dark hover:bg-gray-100 block px-5 py-1 text-base rounded-b-md text-start'
            }
            onClick={() => {
                setIsOpen && setIsOpen(!isOpen)
            }}
        >
            Export as CSV
        </CSVLink>
    )
}

export default ExportEmployeeCSV
