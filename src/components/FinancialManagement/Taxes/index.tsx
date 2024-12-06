import { invoiceTaxAtom } from "@/store/owner";
import { countDecimals, displayCurrency } from "@/utils/helper";
import { useAtomValue } from "jotai";

interface FinancialManagementTaxesProps {
    productsTaxAmount: number;
    servicesTaxAmount: number;
    expensesTaxAmount: number;
}

const FinancialManagementTaxes = ({
    productsTaxAmount,
    servicesTaxAmount,
    expensesTaxAmount
}: FinancialManagementTaxesProps) => {
    const taxes = useAtomValue(invoiceTaxAtom)
    
    return (
        <div className='flex flex-col h-auto text-zentive-gray-medium mb-4'>
            {taxes.productTax > 0 && (
                <div className='flex flex-row justify-between px-8'>
                    <p>- Products {countDecimals(taxes.productTax) > 2 ? taxes.productTax.toFixed(2) : taxes.productTax}% </p>
                    <p>{displayCurrency(productsTaxAmount)}</p>
                </div>
            )}
            {taxes.serviceTax > 0 && (
                <div className='flex flex-row justify-between px-8'>
                    <p>- Services {countDecimals(taxes.serviceTax) > 2 ? taxes.serviceTax.toFixed(2) : taxes.serviceTax}% </p>
                    <p>{displayCurrency(servicesTaxAmount)}</p>
                </div>
            )}
            {taxes.expenseTax > 0 && (
                <div className='flex flex-row justify-between px-8'>
                    <p>- Expenses {countDecimals(taxes.expenseTax) > 2 ? taxes.expenseTax.toFixed(2) : taxes.expenseTax}% </p>
                    <p>{displayCurrency(expensesTaxAmount)}</p>
                </div>
            )}
        </div>
    );
}

export default FinancialManagementTaxes;