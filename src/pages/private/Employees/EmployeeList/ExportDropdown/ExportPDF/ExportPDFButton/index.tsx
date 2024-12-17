import { convertImageToBase64 } from '@/utils/helper'
import daiLogo from '@/assets/dai-logo.png'
import dayjs from 'dayjs'
import { PDFEmployeeExport } from '..'
import { E164Number } from 'libphonenumber-js/core'
import { formatPhoneNumber } from 'react-phone-number-input'
import { UserListType } from '@/api/profile/schema'

interface IExportDataToPDF {
    employeeNumber: string
    name: string
    compensation: string
    caLicense: string
    email: string
    address: string
    phoneNumber: string
    dateOfBirth: string
}
interface IExportEmployeePDFProps {
    employeeListData?: UserListType
}

const ExportEmployeePDF = ({ employeeListData }: IExportEmployeePDFProps) => {
    if (employeeListData === null || !employeeListData?.content?.length) return null

    const handleExportToPDF = async () => {
        convertImageToBase64(daiLogo)
            .then((daiLogo: any) => {
                const tableData: IExportDataToPDF[] = employeeListData.content?.map((employee) => ({
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
                })) as IExportDataToPDF[]

                PDFEmployeeExport(daiLogo, tableData)
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
