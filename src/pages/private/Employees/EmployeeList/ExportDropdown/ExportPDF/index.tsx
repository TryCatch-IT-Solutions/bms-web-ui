import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'
import dayjs from 'dayjs'

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

export const PDFEmployeeExport = (zentiveLogoUrl: string, tableData: IExportDataToPDF[]) => {
    const doc = new jsPDF({ orientation: 'landscape' })

    let startY = 10

    const imageHeight = 17
    const imageWidth = 50

    const pageWidth = doc.internal.pageSize.getWidth()
    const centerX = (pageWidth - imageWidth) / 2

    doc.addImage(zentiveLogoUrl, 'JPEG', centerX, startY, imageWidth, imageHeight)

    startY += imageHeight + 10

    doc.setFontSize(16)
    doc.text('Employees', pageWidth / 2, startY, { align: 'center' })

    startY += 10

    // Define table headers, including all required fields
    const head = [
        [
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
        ],
    ]

    // Map the table data to match the headers and ensure the format is correct
    const body = tableData?.map((data) => [
        data.employee_number,
        data.first_name,
        data.midle_name,
        data.last_name,
        data.email,
        data.phone_number,
        data.gender,
        data.role,
        data.birth_date === '' ? '' : dayjs(data.birth_date).format('MMMM DD, YYYY'),
        data.address1,
        data.address2,
        data.barangay,
        data.municipality,
        data.province,
        data.zip_code,
        data.emergency_contact_name,
        data.emergency_contact_number,
    ])

    // Generate the table using jsPDF autoTable
    autoTable(doc, {
        startY: startY,
        head: head,
        body: body,
        theme: 'striped',
        styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
        headStyles: { fillColor: [59, 103, 26], textColor: [255, 255, 255], fontSize: 8 },
        didDrawPage: (data) => {
            const pageCount = doc.getNumberOfPages()
            const footerStr = `Page ${data.pageNumber} of ${pageCount}`
            doc.setFontSize(10)
            doc.text(footerStr, data.settings.margin.left, doc.internal.pageSize.getHeight() - 10)
        },
    })

    // Save the PDF file
    doc.save('user-list.pdf')
}
