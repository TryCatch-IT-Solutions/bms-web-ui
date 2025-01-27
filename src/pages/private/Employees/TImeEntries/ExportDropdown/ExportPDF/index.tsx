import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'

interface IExportDataToPDF {
    id: number
    first_name: string
    last_name: string
    type: string
    datetime: string
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
    const head = [['Record ID', 'First Name', 'Last Name', 'Type', 'Date']]

    // Map the table data to match the headers and ensure the format is correct
    const body = tableData?.map((data) => [
        data.id,
        data.first_name,
        data.last_name,
        data.type,
        data.datetime,
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
    doc.save('employee-list.pdf')
}
