import { twMerge } from 'tailwind-merge'

interface MenuButtonProps {
    children: React.ReactNode
    className?: string
    disabled?: boolean
    onClick: () => void
}

export const MenuButton = (props: MenuButtonProps) => {
    return (
        <button
            type='button'
            className={twMerge('p-2 text-xs ', props.className)}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
