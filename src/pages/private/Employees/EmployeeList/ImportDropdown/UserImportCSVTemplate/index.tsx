import React from 'react'
import { CSVLink } from 'react-csv'

const UsersCSVTemplate = ({
    isOpen,
    setIsOpen,
}: {
    isOpen?: boolean
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    let csvHeaders: string[] = []

    csvHeaders = [
        'Email',
        'Password',
        'Email Address',
        'First Name',
        'Middle Name',
        'Last Name',
        'Phone Number',
        'Birth Date',
        'Gender',
        'Emergency Contact',
        'Emergency Phone Number',
        'Address 1',
        'Address 2',
        'Barangay',
        'Municipality',
        'Zip Code',
        'Province',
    ]

    return (
        <CSVLink
            data={[]}
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
