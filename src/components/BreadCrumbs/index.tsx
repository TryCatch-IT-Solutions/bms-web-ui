import { ChevronRightIcon } from 'lucide-react'

interface BreadCrumbsProps {
    origin: string
    title: string
    id?: number
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ origin, title, id }) => {
    return (
        <div className='py-10'>
            <p className='font-semibold text-3xl text-gray-600'>{title}</p>
            <p className='flex flex-row items-center text-base text-gray-500'>
                {origin}
                <span>
                    <ChevronRightIcon className='h-4' />
                </span>
                {title}
                {id && (
                    <>
                        <span>
                            <ChevronRightIcon className='h-4' />
                        </span>
                        <span>{id}</span>
                    </>
                )}
            </p>
        </div>
    )
}
