import { INVOICE_STATUS } from '@/constants'

interface InvoiceStatusBarProps {
    status: string
}

const InvoiceStatusBar: React.FC<InvoiceStatusBarProps> = ({ status }) => {
    return (
        <span className='pt-6'>
            {status === INVOICE_STATUS.PAID && (
                <div className='w-[100px] text-center my-auto  bg-zentive-blue-dark px-2  text-white font-normal rounded-full'>
                    Paid
                </div>
            )}

            {status === INVOICE_STATUS.OPEN && (
                <div className='w-[120px] text-center my-auto  bg-[#EBEBEB] px-2  text-black font-normal rounded-full'>
                    Unpaid
                </div>
            )}

            {status === INVOICE_STATUS.PAID_OUT_OF_BAND && (
                <div className='w-[150px] text-center text-white my-auto bg-[#504026] px-2 text-black font-normal rounded-full'>
                    Paid Externally
                </div>
            )}
        </span>
    )
}

export default InvoiceStatusBar
