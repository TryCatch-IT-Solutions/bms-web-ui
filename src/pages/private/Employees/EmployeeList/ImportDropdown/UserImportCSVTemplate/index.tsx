import React from 'react'
import { CSVLink } from 'react-csv'

const UsersCSVTemplate = ({
    isOpen,
    setIsOpen,
}: {
    isOpen?: boolean
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const csvHeaders = [
        { label: 'Email', key: 'Email' },
        { label: 'Password', key: 'Password' },
        { label: 'First Name', key: 'First Name' },
        { label: 'Middle Name', key: 'Middle Name' },
        { label: 'Last Name', key: 'Last Name' },
        { label: 'Phone Number', key: 'Phone Number' },
        { label: 'Birth Date', key: 'Birth Date' },
        { label: 'Gender', key: 'Gender' },
        { label: 'Emergency Contact', key: 'Emergency Contact' },
        { label: 'Emergency Phone Number', key: 'Emergency Contact Number' },
        { label: 'Address 1', key: 'Address 1' },
        { label: 'Address 2', key: 'Address 2' },
        { label: 'Barangay', key: 'Barangay' },
        { label: 'Municipality', key: 'Municipality' },
        { label: 'Zip Code', key: 'Zip Code' },
        { label: 'Province', key: 'Province' },
    ]

    const csvData = [
        {
            Email: 'sample@bms.com',
            Password: 'Test!123',
            'First Name': 'John',
            'Middle Name': 'Test',
            'Last Name': 'Doe',
            'Phone Number': '9457778852',
            'Birth Date': '05/26/1997',
            Gender: 'Male',
            'Emergency Contact': 'Jane Doe',
            'Emergency Contact Number': '9452216365',
            'Address 1': '038 Overland',
            'Address 2': 'High St.',
            Barangay: 'Binukawan',
            Municipality: 'Bagac',
            'Zip Code': '2107',
            Province: 'Bataan',
        },
    ]

    return (
        <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={'import-user-template.csv'}
            className={
                'w-[200px] h-[34px] text-[#191A0A] hover:bg-[#00000029] whitespace-nowrap block px-3 py-1 text-base rounded-b-md'
            }
            onClick={() => {
                setIsOpen && setIsOpen(!isOpen)
            }}
        >
            Download CSV Template
        </CSVLink>
    )
}

export default UsersCSVTemplate
