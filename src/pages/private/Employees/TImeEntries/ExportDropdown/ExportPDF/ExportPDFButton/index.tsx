import { convertImageToBase64, formatUnderscoreString } from '@/utils/helper'
import daiLogo from '@/assets/dai-logo.png'
import dayjs from 'dayjs'
import { PDFEmployeeExport } from '..'
import { TimeEntriesListType } from '@/api/profile/schema'
import { useSetAtom } from 'jotai'
import { employeeExportAtom, employeesToDeleteAtom } from '@/store/user'
import { TIME_DATE_FORMAT } from '@/constants'

interface IExportDataToPDF {
    id: number
    first_name: string
    last_name: string
    type: string
    datetime: string
}
interface IExportEmployeePDFProps {
    timeEntries?: TimeEntriesListType
}

const ExportEmployeePDF = ({ timeEntries }: IExportEmployeePDFProps) => {
    if (timeEntries === null || !timeEntries?.content?.length) return null

    const setEmployeeExportAtom = useSetAtom(employeeExportAtom)
    const setUserIdsToDelete = useSetAtom(employeesToDeleteAtom)

    const handleExportToPDF = async () => {
        convertImageToBase64(daiLogo)
            .then((daiLogo: any) => {
                const tableData: IExportDataToPDF[] =
                    timeEntries?.content?.map((r) => ({
                        id: r?.id || 0,
                        first_name: r?.employee?.first_name || 'N/A',
                        last_name: r?.employee?.last_name || 'N/A',
                        type: formatUnderscoreString(r?.type || 'Unknown'),
                        datetime: dayjs(r?.datetime).format(TIME_DATE_FORMAT.DATE_TIME),
                    })) || []

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
