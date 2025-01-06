import { convertImageToBase64 } from '@/utils/helper'
import daiLogo from '@/assets/dai-logo.png'
import dayjs from 'dayjs'
import { PDFEmployeeExport } from '..'
import { E164Number } from 'libphonenumber-js/core'
import { formatPhoneNumber } from 'react-phone-number-input'
import { UserListType } from '@/api/profile/schema'
import { useSetAtom } from 'jotai'
import { userIdsToDeleteAtom, usersToExportAtom } from '@/store/user'

interface IExportDataToPDF {
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
interface IExportEmployeePDFProps {
    employeeListData?: UserListType
}

const ExportEmployeePDF = ({ employeeListData }: IExportEmployeePDFProps) => {
    if (employeeListData === null || !employeeListData?.content?.length) return null

    const setEmployeeExportAtom = useSetAtom(usersToExportAtom)
    const setUserIdsToDelete = useSetAtom(userIdsToDeleteAtom)

    const handleExportToPDF = async () => {
        convertImageToBase64(daiLogo)
            .then((daiLogo: any) => {
                const tableData: IExportDataToPDF[] = employeeListData.content?.map((employee) => ({
                    employee_number: '000' + employee.id,
                    first_name: employee.first_name,
                    midle_name: employee.middle_name ?? '', // Handle optional middle name
                    last_name: employee.last_name,
                    email: employee.email,
                    phone_number: `${
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
                    gender: employee.gender,
                    role: employee.role,
                    birth_date: dayjs(employee.birth_date).format('MMMM DD, YYYY'),
                    address1: employee.address1,
                    address2: employee.address2 ?? '', // Handle optional address2
                    barangay: employee.barangay,
                    municipality: employee.municipality,
                    province: employee.province,
                    zip_code: employee.zip_code,
                    emergency_contact_name: employee.emergency_contact_name,
                    emergency_contact_number: `${
                        employee.emergency_contact_no?.startsWith('+6')
                            ? `(+63)-${formatPhoneNumber(
                                  ('+63' +
                                      employee.emergency_contact_no.substring(2)) as E164Number,
                              )
                                  .replace('0', '')
                                  .replace(' ', '-')}`
                            : `(${employee.emergency_contact_no?.substring(
                                  0,
                                  3,
                              )})-${formatPhoneNumber(employee.emergency_contact_no as E164Number)
                                  .replace('0', '')
                                  .replace(' ', '-')}`
                    }`,
                })) as IExportDataToPDF[]

                // Pass the formatted data and the logo to the PDF generation function
                PDFEmployeeExport(daiLogo, tableData)
                setUserIdsToDelete(null)
                setEmployeeExportAtom(null)
            })
            .catch((err) => console.error('Error converting image to Base64:', err.message))
    }

    return (
        <button
            className='w-[150px] h-[34px] text-gray-dark hover:bg-gray-100 block px-5 py-1 text-base rounded-b-md text-start'
            onClick={handleExportToPDF}
        >
            Export as PDF
        </button>
    )
}

export default ExportEmployeePDF
