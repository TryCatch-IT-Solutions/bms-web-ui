import { ChevronRightIcon } from 'lucide-react'

interface BreadCrumbsProps {
    origin?: string
    title: string
    id?: number
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ origin, title, id }) => {
    return (
        <div className='py-10 xs:py-5'>
            <p className='font-semibold text-2xl xs:text-lg text-gray-600'>{title}</p>
            <p className='flex flex-row items-center text-base xs:text-sm text-gray-500'>
                {origin}
                {origin !== '' && origin !== undefined && (
                    <>
                        <span>
                            <ChevronRightIcon className='h-4' />
                        </span>
                        {title}
                    </>
                )}

                {(id ?? 0) > 0 && (
                    <>
                        <span>
                            <ChevronRightIcon className='h-4' />
                        </span>
                        <span>{(id ?? 0) > 0 ? id : ''}</span>
                    </>
                )}
            </p>
        </div>
    )
}
