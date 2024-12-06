import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'
import { ExportDataToPDFType } from '@/pages/private/ManageSubscription/Subscribers/ExportFile/ExportPDF'
import { CreateJobType, ReadJobType } from '@/api/job/schema'
import { formatTo24HourClock } from './time'
import {
    COMPLETE_FORMAT_WITHOUT_TIME,
    TWELVE_HOUR_CLOCK_WITH_MERIDIEM,
    US_FORMAT,
} from '@/constants'
import { InvoiceType } from '@/api/invoicing/schema'
import dayjs from 'dayjs'
import { FullProfileType } from '@/api/profile/schema'

export const pdfGenerator = (zentiveLogoUrl: string, tableData: ExportDataToPDFType[]) => {
    const doc = new jsPDF()

    let startY = 10

    const imageHeight = 17
    const imageWidth = 50

    const pageWidth = doc.internal.pageSize.getWidth()
    const centerX = (pageWidth - imageWidth) / 2

    doc.addImage(zentiveLogoUrl, 'JPEG', centerX, startY, imageWidth, imageHeight)

    startY += imageHeight + 10

    doc.setFontSize(16)
    doc.text('Subscribers', pageWidth / 2, startY, { align: 'center' })

    startY += 10

    const head = [
        [
            'Business Name',
            'Subscriber',
            'Subscription',
            'Email Address',
            'Address',
            'Contact Number',
            'Register On',
        ],
    ]

    const body = tableData?.map((data) => [
        data.businessName,
        data.subscriberName,
        data.subscription,
        data.email,
        data.address,
        data.phoneNumber,
        data.createdAt,
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

    doc.save('subscribers_report.pdf')
}

export const generateJobPdf = (
    _zentiveLogoUrl: string,
    job: ReadJobType,
    ownerName: string,
    ownerEmail: string,
    ownerAddress: string,
) => {
    const doc = new jsPDF({ orientation: 'landscape' })

    // setup pdf page width and height
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const leftMargin = 14
    let startY = 10

    // setup zentive image logo h and w
    // const imageHeight = 17
    // const imageWidth = 50
    // const centerX = leftMargin
    // doc.addImage(zentiveLogoUrl, 'JPEG', centerX, startY, imageWidth, imageHeight)

    // setup JOB ORDER TITLE
    startY = 30
    doc.setFontSize(32)
    doc.setTextColor(59, 103, 26)
    doc.setFont('helvetica', 'bold')
    doc.text('JOB ORDER', pageWidth - leftMargin, startY, { align: 'right' })
    startY += 5

    // setup zentive and address
    const flexTextX = leftMargin
    const flexTextY = startY
    doc.setTextColor(59, 103, 26)
    doc.setFontSize(20)
    doc.text(ownerName, flexTextX, flexTextY + 5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(112, 112, 112)
    doc.setFontSize(12)
    doc.text(ownerAddress, flexTextX, flexTextY + 11)
    doc.setFontSize(12)
    doc.text(ownerEmail, flexTextX, flexTextY + 16)

    // setup recipient
    const flexTextXLeft2 = leftMargin
    const flexTextYLeft2 = flexTextY + 30
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(25, 26, 10)
    doc.setFontSize(14)
    doc.text(
        `RECIPIENT: ${job.quote.profile?.firstName} ${job.quote.profile?.lastName}`,
        flexTextXLeft2,
        flexTextYLeft2,
    )
    doc.setFontSize(12)
    doc.text(`Property Address`, flexTextXLeft2 + 29, flexTextYLeft2 + 10)
    doc.setFont('helvetica', 'normal')
    doc.text(
        `${job.address?.streetAddress}, ${job.address?.city}, \n${job.address?.state}, ${job.address?.zipCode}`,
        flexTextXLeft2 + 29,
        flexTextYLeft2 + 16,
    )

    // JOB ORDER #
    const rightDivWidth1 = 90
    const rightDivHeight1 = 10
    const rightDivX1 = pageWidth - rightDivWidth1 - leftMargin
    const rightDivY1 = startY

    doc.setFillColor(59, 103, 26)
    doc.rect(rightDivX1, rightDivY1, rightDivWidth1, rightDivHeight1, 'F')
    doc.setTextColor(255, 255, 255)

    const rightTextX1 = rightDivX1 + 9
    const rightTextY1 = rightDivY1 + 7
    doc.text(`JOB ORDER `, rightTextX1, rightTextY1)
    doc.text(`#000${job.jobNumber}`, pageWidth - leftMargin - 9, rightTextY1, { align: 'right' })

    // schedule - start date and end date
    const rightDivWidth2 = 90
    const rightDivHeight2 = 10
    const rightDivX2 = pageWidth - rightDivWidth2 - leftMargin
    const rightDivY2 = startY + 10
    doc.setFillColor(248, 248, 248)
    doc.rect(rightDivX2, rightDivY2, rightDivWidth2, rightDivHeight2, 'F')

    const rightTextX2 = rightDivX2 + 9
    const rightTextY2 = rightDivY2 + 2
    doc.setTextColor(25, 26, 10)
    doc.text(
        `Schedule:     ${
            formatTo24HourClock(job.appointment?.startDateTime, US_FORMAT) +
            ' - ' +
            formatTo24HourClock(job.appointment?.endDateTime, US_FORMAT)
        }`,
        rightTextX2,
        rightTextY2 + 5,
    )

    // client - phone number
    const rightDivWidth3 = 90
    const rightDivHeight3 = 24
    const rightDivX3 = pageWidth - rightDivWidth3 - leftMargin
    const rightDivY3 = startY + 28

    doc.setFillColor(248, 248, 248)
    doc.rect(rightDivX3, rightDivY3, rightDivWidth3, rightDivHeight3, 'F')
    const rightTextX3 = rightDivX3 + 5
    const rightTextY3 = rightDivY3 + 5
    doc.text(
        `Client can be reached by: \n${job.quote.profile?.phoneNumber}`,
        rightTextX3,
        rightTextY3 + 5,
    )

    //gap between table and upper portion of pdf
    startY = rightTextY3 + 30

    // services / products table
    const head = [['Product / Service', 'Description', 'Date', 'Time']]

    // get all services from quote
    const body = job.quote.productServiceGroup?.map((product) => [
        product.name ?? '',
        product.description ?? '',
        formatTo24HourClock(job.appointment?.startDateTime, US_FORMAT),
        formatTo24HourClock(job.appointment?.startDateTime, TWELVE_HOUR_CLOCK_WITH_MERIDIEM),
    ])

    // plot table
    autoTable(doc, {
        startY: startY,
        head: head,
        body: body,
        theme: 'grid',
        columnStyles: {
            0: { cellWidth: (3 / 12) * (pageWidth - 28) },
            1: { cellWidth: (5 / 12) * (pageWidth - 28) },
            2: { cellWidth: (2 / 12) * (pageWidth - 28), halign: 'center' },
            3: { cellWidth: (2 / 12) * (pageWidth - 28), halign: 'center' },
        },
        styles: {
            fillColor: [248, 248, 248],
            fontSize: 12,
            textColor: [25, 26, 10],
            cellPadding: 4,
            overflow: 'linebreak',
            lineColor: [255, 255, 255],
            lineWidth: 0.5,
        },
        headStyles: {
            fillColor: [59, 103, 26],
            textColor: [255, 255, 255],
            fontSize: 12,
            halign: 'center',
        },
        didDrawPage: (data) => {
            const pageCount = doc.getNumberOfPages()
            const footerStr = `Page ${data.pageNumber} of ${pageCount}`
            doc.setTextColor(112, 112, 112)
            doc.setFontSize(10)
            doc.text(footerStr, data.settings.margin.left, pageHeight - 10)
        },
    })

    doc.setTextColor(112, 112, 112)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Powered by Zentive', pageWidth - leftMargin, pageHeight - 10, { align: 'right' })

    doc.save(`job-order000${job.jobNumber}.pdf`)
}

export const generateInvoicePdf = (invoice: InvoiceType, user: FullProfileType) => {
    const doc = new jsPDF({ orientation: 'portrait' })
    let startY = 10

    // setup pdf page width
    const pageWidth = doc.internal.pageSize.getWidth()
    const leftMargin = 10

    const previousColor = doc.getTextColor()

    // setup invoice title
    startY += 10
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('Invoice Breakdown', pageWidth / 2, startY, { align: 'center' })
    doc.setTextColor(previousColor)
    doc.setFontSize(9)

    const flexDivHeight = 20
    const flexDivX = leftMargin
    const flexDivY = startY

    // billed to
    const flexTextXLeft2 = flexDivX + 5
    const flexTextYLeft2 = flexDivY + 16

    doc.text(`Billed To`, flexDivX + 5, flexTextYLeft2)
    doc.setFont('helvetica', 'normal')
    // customer name
    const flexTextYLeft3 = flexDivY + 21
    doc.setFontSize(9)

    doc.text(
        `${invoice?.profile?.firstName} ${invoice?.profile?.lastName}`,
        flexTextXLeft2,
        flexTextYLeft3,
    )

    // doc.setFont('helvetica', 'bold')
    // doc.text(`Account Number: `, flexDivX + 5, flexTextYLeft2 + 25)
    // doc.setFont('helvetica', 'normal')
    // // customer name
    // doc.setFontSize(9)

    // doc.text(`00${invoice?.profile?.accountNumber}`, flexDivX + 33, flexTextYLeft2 + 25)

    // address
    doc.setFontSize(9)
    doc.text(
        `${invoice?.profile?.address?.streetAddress}, ${invoice?.profile?.address?.city}, ${invoice?.profile?.address?.state}, ${invoice?.profile?.address?.zipCode}`,
        flexTextXLeft2,
        flexTextYLeft3 + 5,
    )

    // start of invoice
    const rightDivWidth1 = 70
    const rightDivX1 = pageWidth - rightDivWidth1 - leftMargin
    const rightDivY1 = startY + 2

    const rightTextX1 = rightDivX1 + 5
    const rightTextY1 = rightDivY1 + 14
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(`Invoice Number: `, rightTextX1, rightTextY1)
    doc.setFont('helvetica', 'normal')
    doc.text(`#00${invoice.businessInvoiceNumber}`, rightTextX1 + 26, rightTextY1)
    doc.setFont('helvetica', 'bold')
    doc.text(`Billing Date: `, rightTextX1, rightTextY1 + 5)
    doc.setFont('helvetica', 'normal')
    doc.text(
        `${dayjs(invoice.createdAt).format(COMPLETE_FORMAT_WITHOUT_TIME)}`,
        rightTextX1 + 20,
        rightTextY1 + 5,
    )
    doc.setFont('helvetica', 'bold')
    doc.text(`Due Date: `, rightTextX1, rightTextY1 + 10)
    doc.setFont('helvetica', 'normal')
    doc.text(
        `${dayjs(invoice?.createdAt)
            .add(1, 'month')
            .format(COMPLETE_FORMAT_WITHOUT_TIME)}`,
        rightTextX1 + 16,
        rightTextY1 + 10,
    )

    doc.setFontSize(10)
    doc.setTextColor(37, 66, 132)
    doc.setFont('helvetica', 'bold')
    doc.text(`Total Amount: `, rightTextX1 + 15, rightTextY1 + 25)
    doc.setFont('helvetica', 'normal')
    doc.text(`$${invoice?.totalAmount?.toFixed(2)}`, rightTextX1 + 40, rightTextY1 + 25)
    doc.setFontSize(9)
    doc.setTextColor(0, 0, 0)

    const rightDivHeight3 = 15

    //gap between table and upper portion of pdf
    startY += rightDivHeight3 + 5

    startY += flexDivHeight + 5

    // services / products table
    const head = [['Product/Service', 'Description', 'Quantity', 'Price', 'Total']]

    // get all services from quote
    const body =
        invoice?.quote?.productServiceGroup?.map((service) => [
            service.name,
            service.description ?? '--',
            '1',
            service.unitPrice,
            service.cost,
        ]) || []

    // plot table
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

    // Add additional sections
    startY += body?.length * 10 + 20

    startY += 20
    // Notes section
    doc.setFont('helvetica', 'bold')
    doc.text('Notes', flexDivX + 5, startY)
    startY += 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(invoice?.internalNotes || 'No notes available', flexDivX + 5, startY)

    startY -= 5
    // Cost breakdown section
    doc.setFont('helvetica', 'bold')
    doc.text('Labor Cost', rightTextX1, startY)
    doc.setFont('helvetica', 'normal')
    doc.text(`$${invoice?.laborCost?.toFixed(2)}`, rightTextX1 + 40, startY)

    startY += 5
    doc.setFont('helvetica', 'bold')
    doc.text('Subtotal', rightTextX1, startY)
    doc.setFont('helvetica', 'normal')
    doc.text(`$${invoice?.subTotal?.toFixed(2)}`, rightTextX1 + 40, startY)

    startY += 5
    doc.setFont('helvetica', 'bold')
    doc.text('Discount', rightTextX1, startY)
    doc.setFont('helvetica', 'normal')
    doc.text(`$${invoice?.discount?.toFixed(2)}`, rightTextX1 + 40, startY)

    startY += 5
    doc.setFont('helvetica', 'bold')
    doc.text('Tax', rightTextX1, startY)
    doc.setFont('helvetica', 'normal')
    doc.text(`$${invoice?.tax?.toFixed(2)}`, rightTextX1 + 40, startY)

    // setup invoice footer
    startY += 110
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Thank You for Trusting Us', pageWidth / 2, startY, { align: 'center' })
    doc.setTextColor(previousColor)
    doc.setFontSize(8)

    startY += 5
    doc.setTextColor(112, 112, 112)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text(`${user?.business?.businessName}`, pageWidth / 2, startY, { align: 'center' })

    startY += 5
    doc.setFont('helvetica', 'normal')
    doc.text(
        `${invoice?.profile?.address?.streetAddress}, ${invoice?.profile?.address?.city}, ${invoice?.profile?.address?.state}, ${invoice?.profile?.address?.zipCode}`,
        pageWidth / 2,
        startY,
        { align: 'center' },
    )

    startY += 5
    doc.text(`${invoice?.profile?.email}`, pageWidth / 2, startY, { align: 'center' })

    startY += 8
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('Powered by Zentive', pageWidth / 2, startY, { align: 'center' })

    doc.save(`invoice-${invoice.invoiceName}.pdf`)
}

export const generateJobRoutePdf = (
    _zentiveLogoUrl: string,
    jobs: CreateJobType[] | null,
    ownerName: string
) => {
    const doc = new jsPDF({ orientation: 'landscape' })

    // setup pdf page width and height
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let startY = 10

    // setup job route pdf title
    startY = 30
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'bold')
    doc.text(ownerName, 150, startY, { align: 'center' })
    startY += 25

    const rightDivWidth1 = 267
    const rightDivHeight1 = 10
    const rightDivX1 = 15
    const rightDivY1 = 45

    doc.setFillColor(59, 103, 26)
    doc.rect(rightDivX1, rightDivY1, rightDivWidth1, rightDivHeight1, 'F')
    doc.setTextColor(255, 255, 255)

    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Route Sheet For: ' + jobs?.[0].crew?.description, 15, 52, { align: 'left' })

    // job route details headers
    const head = [['Date Printed', 'Total Man Hours', 'Total Area (Yards)', 'Foreman']]

    const foreman = jobs?.[0]?.jobCrewMembers.find((foreman) => jobs?.[0]?.foreman.crewMemberId === foreman.crewMemberId)

    // get job route details
    const body = [
        [
            dayjs().format(COMPLETE_FORMAT_WITHOUT_TIME) || '',
            '--',
            '--',
            foreman?.memberProfile?.firstName + ' ' + foreman?.memberProfile?.lastName
        ]
    ];

    // plot route details table
    autoTable(doc, {
        startY: startY,
        head: head,
        body: body,
        theme: 'grid',
        columnStyles: {
            0: { cellWidth: (3 / 12) * (pageWidth - 28), halign: 'center' },
            1: { cellWidth: (5 / 12) * (pageWidth - 28), halign: 'center' },
            2: { cellWidth: (2 / 12) * (pageWidth - 28), halign: 'center' },
            3: { cellWidth: (2 / 12) * (pageWidth - 28), halign: 'center' },
        },
        styles: {
            fillColor: [248, 248, 248],
            fontSize: 12,
            textColor: [25, 26, 10],
            cellPadding: 4,
            overflow: 'linebreak',
            lineColor: [255, 255, 255],
            lineWidth: 0.5,
        },
        headStyles: {
            fillColor: [246, 255, 239],
            textColor: [0, 0, 0],
            fontSize: 12,
            halign: 'center',
        },
    })

    doc.setTextColor(59, 103, 26)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Crew', 15, 90, { align: 'left' })

    // crew table headers
    const crewHead = [['Name', 'Email Address']]

    // get all crew names and email
    const crewBody =
        jobs?.[0]?.jobCrewMembers?.map((crew) => [
            crew.memberProfile.firstName + ' ' + crew.memberProfile.lastName,
            crew.memberProfile.email
        ]) || []

    
    const crewTableWidth = (3 / 12) * (pageWidth - 28) + (5 / 12) * (pageWidth - 28);
    const crewTableStartX = (pageWidth - crewTableWidth) / 2;   
    
    // plot crew table
    autoTable(doc, {
        startY: 95,
        head: crewHead,
        body: crewBody,
        theme: 'grid',
        columnStyles: {
            0: { cellWidth: (3 / 12) * (pageWidth - 28) },
            1: { cellWidth: (5 / 12) * (pageWidth - 28) },
            2: { cellWidth: (2 / 12) * (pageWidth - 28), halign: 'center' },
            3: { cellWidth: (2 / 12) * (pageWidth - 28), halign: 'center' },
        },
        styles: {
            fillColor: [248, 248, 248],
            fontSize: 12,
            textColor: [25, 26, 10],
            cellPadding: 4,
            overflow: 'linebreak',
            lineColor: [255, 255, 255],
            lineWidth: 0.5,
        },
        headStyles: {
            fillColor: [246, 255, 239],
            textColor: [0, 0, 0],
            fontSize: 12,
            halign: 'center',
        },
        margin: { left: crewTableStartX },
    })

    doc.setTextColor(59, 103, 26)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Stops in Order', 15, 145, { align: 'left' })

    startY = 135
    // Loop through each job in jobs array
    jobs?.forEach((job, index) => {
        // Job title dimensions
        const jobTitleHeight = 24; // Adjust based on your title height
        const jobTableHead = [['Job', 'Address', 'Email Address', 'Phone Number']];
        const jobTableBody = [
            [
                job?.quote?.productServiceGroup?.[0]?.name || '',
                `${job?.address?.streetAddress + ','} ${job?.address?.city + ','} ${job?.address?.state + ','} ${job
                    ?.address?.zipCode}`,
                job?.quote?.profile?.email || '',
                job?.quote?.profile?.phoneNumber || ''
            ]
        ];
    
        // Calculate table height dynamically by rendering it off-screen (or use a static estimate)
        const jobTableHeight = 40; // Adjust this to your actual table height
        const totalHeight = jobTitleHeight + jobTableHeight + 10; // +10 for spacing
        
        // Check if there is enough space on the page for the next job table
        if (startY + totalHeight > pageHeight - 20) { // -20 for bottom margin
            // If not enough space, add a new page
            doc.addPage();
            startY = 10; // Reset startY for the new page
        }
    
        // Job title
        const rightDivWidth1 = 267;
        const rightDivHeight1 = 10;
        const rightDivX1 = 15;
        const rightDivY1 = startY;
    
        doc.setFillColor(59, 103, 26);
        doc.rect(rightDivX1, rightDivY1, rightDivWidth1, rightDivHeight1, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(index + 1 + '. ' + job?.quote?.profile?.firstName + ' ' + job?.quote?.profile?.lastName, 115, startY + 7);
        startY += jobTitleHeight; // Update startY after the title
    
        // Plot table for this job
        autoTable(doc, {
            startY: startY - 15,
            head: jobTableHead,
            body: jobTableBody,
            theme: 'grid',
            columnStyles: {
                0: { cellWidth: (3 / 12) * (pageWidth - 28) },
                1: { cellWidth: (5 / 12) * (pageWidth - 28) },
                2: { cellWidth: (2 / 12) * (pageWidth - 28), halign: 'center' },
                3: { cellWidth: (2 / 12) * (pageWidth - 28), halign: 'center' },
            },
            styles: {
                fillColor: [248, 248, 248],
                fontSize: 12,
                textColor: [25, 26, 10],
                cellPadding: 4,
                overflow: 'linebreak',
                lineColor: [255, 255, 255],
                lineWidth: 0.5,
            },
            headStyles: {
                fillColor: [246, 255, 239],
                textColor: [0, 0, 0],
                fontSize: 12,
                halign: 'center',
            },
        });
    
        // Update startY based on the height of the job table
        startY += jobTableHeight + 10; // +10 for additional spacing between tables
    });

    doc.setTextColor(112, 112, 112)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Powered by Zentive', 290, pageHeight - 10, { align: 'right' })

    doc.save(`route-sheet-${dayjs().format(COMPLETE_FORMAT_WITHOUT_TIME)}-000${jobs?.[0]?.crew?.crewNumber}.pdf`)
}
