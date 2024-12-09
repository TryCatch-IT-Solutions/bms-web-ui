import { Dialog, Transition } from '@headlessui/react'
import React, { useState, useRef } from 'react'
import { Fragment } from 'react'
import { HiX } from 'react-icons/hi'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { twMerge } from 'tailwind-merge'

interface AppModalProps {
    isOpen: boolean
    title: string
    onClose: () => void
    children: React.ReactNode
    disabled?: boolean
    isHideCloseButton?: boolean
    isAlert?: boolean
    containerClassName?: string
    titleClassName?: string
}

export const Modal = ({
    isOpen,
    title,
    onClose,
    children,
    disabled,
    isHideCloseButton,
    isAlert,
    containerClassName,
    titleClassName,
}: AppModalProps) => {
    const [isOpenInternal, setIsOpenInternal] = useState<boolean>(false)
    const btnRef = useRef<HTMLButtonElement | null>(null)

    const btnFocus = () => {
        if (btnRef.current) {
            btnRef.current.focus()
        }
    }
    // Close the modal when the `isOpen` prop changes
    if (isOpen !== isOpenInternal) {
        setIsOpenInternal(isOpen)
    }

    return (
        <Transition appear show={isOpenInternal} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 z-50 overflow-auto'
                onClose={onClose}
                onLoad={btnFocus}
            >
                <div className='min-h-screen px-4 flex items-center justify-center'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-black opacity-50' />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className='inline-block h-screen align-middle' aria-hidden='true'>
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <div
                            className={twMerge(
                                'inline-block w-full max-w-[577px] my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg',
                                containerClassName,
                            )}
                        >
                            {title !== '' && (
                                <Dialog.Title
                                    as='h3'
                                    className={twMerge(
                                        'p-6 pb-2 text-left font-semibold text-2xl text-[#191A0A] inline-flex justify-center items-center gap-5',
                                        `${titleClassName}`,
                                    )}
                                    aria-label={title}
                                    tabIndex={0}
                                    aria-hidden={title === '' ? true : false}
                                >
                                    {isAlert && (
                                        <div className='flex justify-center items-center bg-zentive-red-light h-[62px] w-[62px] rounded-full'>
                                            <HiOutlineExclamationTriangle className='h-[26px] w-[26px] mx-[17px]  yx-[17px] text-zentive-red-dark' />
                                        </div>
                                    )}
                                    {title}
                                </Dialog.Title>
                            )}
                            <button
                                className={twMerge(
                                    'absolute top-4 right-4 z-20 bg-white rounded-full outline-none shadow-md p-2 cursor-pointer disabled:bg-gray-300',
                                    isHideCloseButton && 'hidden',
                                )}
                                aria-label='Close'
                                disabled={disabled}
                                onClick={onClose}
                                tabIndex={0}
                                autoFocus
                                ref={btnRef}
                            >
                                <HiX className='h-6 w-6 text-gray-600' />
                            </button>
                            <div className='mt-4'>{children}</div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
