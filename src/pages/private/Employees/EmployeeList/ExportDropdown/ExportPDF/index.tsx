import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'
import dayjs from 'dayjs'

interface IExportDataToPDF {
    employeeNumber: string
    name: string
    email: string
    phoneNumber: string
    address: string
    dateOfBirth: string
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

    const head = [
        ['Employee Number', 'Name', 'Email Address', 'Address', 'Phone Number', 'Date of Birth'],
    ]

    const body = tableData?.map((data) => [
        data.employeeNumber,
        data.name,
        data.email,
        data.address,
        data.phoneNumber,
        data.dateOfBirth === '' ? '' : dayjs(data.dateOfBirth).format('MMMM DD, YYYY'),
    ])

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

    doc.save('employee-list.pdf')
}
