'use client'

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '@/components/Toast'
import { useToast } from '@/hooks/useToast'

export const Toaster = () => {
    const { toasts } = useToast()

    return (
        <ToastProvider swipeDirection='right'>
            {toasts?.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id} {...props}>
                        <div className='grid gap-1'>
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport className='top-20 right-0' />
        </ToastProvider>
    )
}
