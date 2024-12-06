import { cn } from '@/utils/helper'

interface UpgradeBadgeProps {
    label?: string
    className?: string
}

export const UpgradeBadge: React.FC<UpgradeBadgeProps> = ({ label, className }) => {
    return (
        <div
            className={cn(
                'rounded-full bg-zentive-purple-dark py-2 px-4 text-white w-fit',
                className,
            )}
        >
            <p>{label ? label : 'Upgrade Required'}</p>
        </div>
    )
}
