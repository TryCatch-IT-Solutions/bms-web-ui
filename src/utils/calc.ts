import { CrewtoCrewMemberType } from '@/api/crew/schema'
import { InvoiceType } from '@/api/invoicing/schema'
import { QuoteType } from '@/api/quoting/schema'

export const computeQuote = (quote: QuoteType, isForInvoice: boolean) => {
    // Use optional chaining and nullish coalescing for concise null/undefined handling
    const baseSubtotal = quote?.subTotal ?? 0
    const baseDiscount = quote?.discount ?? 0
    const laborCost = quote?.laborCost ?? 0
    const tax = quote?.tax ?? 0

    // Calculate cost using reduce with a default accumulator
    const cost = quote?.productServiceGroup?.reduce(
        (acc = 0, datum) => acc + (datum.unitPrice || 0) * (datum.quantity || 0),
        0,
    )

    // Calculate discount based on isDiscountPercent flag
    const discount = quote?.isDiscountPercent ? (baseDiscount / 100) * baseSubtotal : baseDiscount

    const totalServicePrice =
        quote?.productServiceGroup?.length > 0
            ? quote.productServiceGroup.reduce((total, price) => total + (price.cost || 0), 0)
            : 0

    const totalServices =
        quote?.productServiceGroup?.length > 0
            ? quote.productServiceGroup
                  .filter((service) => service.type === 'service')
                  .reduce((total, price) => total + (price.cost || 0), 0)
            : 0

    const totalProducts =
        quote?.productServiceGroup?.length > 0
            ? quote.productServiceGroup
                  .filter((product) => product.type === 'product')
                  .reduce((total, price) => total + (price.cost || 0), 0)
            : 0

    const totalExpenses =
        quote?.expense && quote.expense.length > 0
            ? quote?.expense
                  ?.filter((exp) => !exp.isSavedFromCrew)
                  .reduce((total, expense) => total + (expense.total || 0), 0)
            : 0

    const totalExpensesIncluded =
        quote?.expense && quote?.expense.length > 0
            ? quote?.expense
                  .filter((exp) => !exp.isNotIncludedInInvoice)
                  .reduce((total, expense) => total + (expense.total || 0), 0)
            : 0

    // Calculate tax for products, services and expenses
    const taxPercentage =
        baseSubtotal - discount === 0 ? 0 : (tax / (baseSubtotal - discount)) * 100

    const productsTax = quote?.productTax ?? 0.0
    const servicesTax = quote?.serviceTax ?? 0.0
    const expensesTax = quote?.expenseTax ?? 0.0

    const productsTaxPercentage = (quote?.productTax ?? 0)
    const servicesTaxPercentage = (quote?.serviceTax ?? 0)
    const expensesTaxPercentage = (quote?.expenseTax ?? 0)

    const taxName = quote?.taxName ?? ''

    const productsTaxAmount = (totalProducts * productsTax) / 100
    const servicesTaxAmount = (totalServices * servicesTax) / 100
    const expensesTaxAmount = (totalExpenses * expensesTax) / 100

    // Calculate subtotal using spread syntax for better readability
    const subTotal = isForInvoice ? 
            laborCost + totalExpensesIncluded + totalServicePrice
            : baseSubtotal

    //const totalMarkupPrice = totalServicePrice - totalUnitPrice

    const totalAfterDiscount = isForInvoice ? subTotal - discount : baseSubtotal - discount

    const totalTaxAmount = productsTaxAmount + servicesTaxAmount + expensesTaxAmount
    const totalTaxPercentage = (totalTaxAmount / totalAfterDiscount) * 100

    // Calculate total using destructuring assignment
    const { total } = {
        total: isForInvoice ? totalAfterDiscount : totalAfterDiscount + totalTaxAmount,
    }

    // Calculate totalAmount, totalServicePrice, totalUnitPrice, totalExpenses with early returns
    const totalAmount = isForInvoice ? total : quote?.totalAmount ?? 0

    const estimate = totalAfterDiscount - cost

    // Calculate estimatePercentage with early returns for totalAmount === 0
    const estimatePercentage =
        (isForInvoice ? total : totalAmount) === 0
            ? 0
            : (estimate / totalAfterDiscount) * 100
    return {
        cost,
        discount,
        estimate,
        estimatePercentage,
        laborCost,
        subTotal,
        tax,
        taxPercentage,
        total,
        totalAfterDiscount,
        taxName,
        productsTaxPercentage,
        servicesTaxPercentage,
        expensesTaxPercentage,
        productsTaxAmount,
        servicesTaxAmount,
        expensesTaxAmount,
        totalTaxPercentage,
        totalTaxAmount,
        totalServices,
        totalProducts,
        totalExpenses,
        totalExpensesIncluded
    }
}

export const computeInvoice = (invoice: InvoiceType | null) => {
    const baseDiscount = !invoice?.discount ? 0.0 : Number(invoice.discount)
    const laborCost = invoice?.laborCost ?? 0

    const tax = !invoice?.tax ? 0.0 : invoice.tax
    const cost = Number(
        invoice?.quote?.productServiceGroup?.reduce(
            (acc, datum) => acc + (datum.unitPrice || 0) * (datum.quantity || 0),
            0,
        ) || 0.0,
    )

    const totalServicePrice =
        invoice?.quote?.productServiceGroup && invoice?.quote?.productServiceGroup.length > 0
            ? invoice?.quote?.productServiceGroup.reduce(
                  (total, price) => total + (price.cost || 0),
                  0,
              )
            : 0

    const totalServices =
        invoice?.quote?.productServiceGroup && invoice?.quote?.productServiceGroup?.length > 0
            ? invoice?.quote.productServiceGroup
                  .filter((service) => service.type === 'service')
                  .reduce((total, price) => total + (price.cost || 0), 0)
            : 0

    const totalProducts =
        invoice?.quote?.productServiceGroup && invoice?.quote?.productServiceGroup?.length > 0
            ? invoice?.quote.productServiceGroup
                  .filter((product) => product.type === 'product')
                  .reduce((total, price) => total + (price.cost || 0), 0)
            : 0

    const totalUnitPrice =
        invoice?.quote?.productServiceGroup && invoice?.quote?.productServiceGroup.length > 0
            ? invoice?.quote?.productServiceGroup.reduce(
                  (total, price) => total + (price.unitPrice || 0),
                  0,
              )
            : 0

    const totalExpenses =
        invoice?.expense && invoice?.expense.length > 0
            ? invoice?.expense.reduce((total, expense) => total + (expense.total || 0), 0)
            : 0

    const totalExpensesIncluded =
        invoice?.expense && invoice?.expense.length > 0
            ? invoice?.expense
                  .filter((exp) => !exp.isNotIncludedInInvoice)
                  .reduce((total, expense) => total + (expense.total || 0), 0)
            : 0

    const productsTax = invoice?.productTax ?? 0.0
    const servicesTax = invoice?.serviceTax ?? 0.0
    const expensesTax = invoice?.expenseTax ?? 0.0

    const productsTaxPercentage = invoice?.productTax ?? 0
    const servicesTaxPercentage = invoice?.serviceTax ?? 0
    const expensesTaxPercentage = invoice?.expenseTax ?? 0

    const taxName = invoice?.taxName ?? ''

    const productsTaxAmount = (totalProducts * productsTax) / 100
    const servicesTaxAmount = (totalServices * servicesTax) / 100
    const expensesTaxAmount = (totalExpensesIncluded * expensesTax) / 100

    const totalTaxAmount = productsTaxAmount + servicesTaxAmount + expensesTaxAmount

    const subTotal = invoice?.subTotal as number

    const discount = Number(baseDiscount)

    const totalMarkupPrice = totalServicePrice - totalUnitPrice

    const taxPercentage = (tax / (invoice?.subTotal! - discount)) * 100

    const totalAfterDiscount = Number(subTotal - discount)

    const totalTaxPercentage = (totalTaxAmount / totalAfterDiscount) * 100

    const total = invoice?.totalAmount as number

    const estimate = totalAfterDiscount - cost

    const estimatePercentage = Number((estimate / totalAfterDiscount) * 100)

    return {
        cost,
        discount,
        estimate,
        estimatePercentage,
        laborCost,
        subTotal,
        tax,
        taxPercentage,
        total,
        totalAfterDiscount,
        taxName,
        productsTaxPercentage,
        servicesTaxPercentage,
        expensesTaxPercentage,
        productsTaxAmount,
        servicesTaxAmount,
        expensesTaxAmount,
        totalTaxPercentage,
        totalTaxAmount,
        totalExpenses,
        totalMarkupPrice,
        totalExpensesIncluded
    }
}

export const computeLaborCost = (crewMembers: CrewtoCrewMemberType[]) => {
    let laborCost = 0
    crewMembers.forEach((member) => {
        laborCost = laborCost + (member.crewProfile.compensation ?? 0)
    })

    return laborCost
}

export const calculateGrossIncome = (invoiceTotal: number, laborCost: number, materials: number) => {
    return invoiceTotal - laborCost - materials
}

export const calculateNetIncome = (grossIncome: number, expenses: number, taxes: number) => {
    return grossIncome - expenses - taxes
}