import { cn } from '@/utils/helper'
import { HTMLAttributes } from 'react'

type IProps = HTMLAttributes<HTMLDivElement> & {
    size?: string
    variant: 'normal' | 'danger'
}

const Spinner: React.FC<IProps> = ({ className, size, variant }) => {
    const color = variant === 'normal' ? 'bms-link' : 'red-100'

    return (
        <div className={`flex justify-center items-center`}>
            <div
                className={cn(
                    `border-b-2 border-l-2 border-r-2 border-t-2 border-${color} border-t-transparent rounded-full animate-spin`,
                    className,
                    size && `w-${size} h-${size}`,
                )}
            ></div>
        </div>
    )
}

export default Spinner
