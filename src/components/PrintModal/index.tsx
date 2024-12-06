import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../Dialog'
import { GoDownload } from 'react-icons/go'

interface IPrintModalProps {
    triggerTitle: string
    triggerClassName: string
    title: string
    children: React.ReactNode
    disabled: boolean
    handleDownloadPDF: () => void
}

const PrintModal = ({
    triggerTitle,
    triggerClassName,
    title,
    children,
    disabled,
    handleDownloadPDF,
}: IPrintModalProps) => {
    return (
        <Dialog>
            <DialogTrigger className={triggerClassName} disabled={disabled}>
                {triggerTitle}
            </DialogTrigger>
            <DialogContent className='rounded-md w-[1400px] max-w-[1400px] h-[1024px] max-h-[800px] p-0'>
                <DialogHeader className='rounded-md space-y-[26px]'>
                    <DialogTitle className='rounded-md text-2xl text-zentive-black text-left'>
                        <div className='flex flex-row justify-between rounded-t-md bg-zentive-gray-medium text-white p-4'>
                            <div>{title}</div>
                            <div className='flex flex-row gap-x-4 px-4'>
                                <button
                                    className='w-full h-8 hover:bg-[#00000029] text-left px-3 whitespace-nowrap'
                                    onClick={handleDownloadPDF}
                                >
                                    <GoDownload className='text-white w-6 h-6' />
                                </button>
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className='overflow-y-scroll green-scrollbar'>{children}</div>
            </DialogContent>
        </Dialog>
    )
}

export default PrintModal
