import React, { useEffect, useRef, useState } from 'react'
import { getExtension } from '@/utils/helper'
import { cn } from '@/utils/helper'
import { useToast } from '@/hooks/useToast'
import { useAtom } from 'jotai'
import { imageUploadErrorAtom } from '@/store/user'

export const BYTE_IN_MB = 1048576
export const BYTE_IN_KB = 1024

type TFileTypes = {
    IMAGE: 'image/*'
    VIDEO: 'video/*'
    APPLICATION: 'application/*'
}

export interface IFile {
    id: string
    name: string
    url: string
    type: string
    size: string
    file: File
}

interface IProps {
    multiple?: boolean
    isDisabled?: boolean
    accept?: TFileTypes | string
    hasError?: (error: string) => void
    maxSize?: number
    onFilesChange: (files: IFile[]) => void
    existingFiles?: IFile[]
    label: string
    labelClassname?: string
    profileStatus?: string
}

const ImageUploader: React.FC<IProps> = (props) => {
    const {
        multiple = false,
        isDisabled = false,
        accept = '*',
        maxSize = 10,
        onFilesChange,
        hasError,
        existingFiles,
        label,
        labelClassname,
        profileStatus,
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [files, setFiles] = useState<IFile[]>([])
    const [error, setError] = useAtom(imageUploadErrorAtom)

    useEffect(() => {
        if (files?.length > 0) {
            onFilesChange(files)
            setFiles([])
        }
    }, [files])

    useEffect(() => {
        if (existingFiles?.length) {
            setFiles(existingFiles)
        }
    }, [existingFiles])

    const onClickHandler = () => {
        fileInput.current?.click()
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.value) {
            addMedia(e.target.files, () => {
                e.target.value = ''
            })
        }
    }

    const { toast } = useToast()

    const addMedia = (
        fileList: FileList,
        callback = () => {
            return
        },
    ) => {
        let index = 0

        const tmpMedias: IFile[] = []

        const validTypes = accept.toString().split(',')

        setError('')

        for (const file of fileList) {
            if (!validTypes.includes(getExtension(file.name))) {
                const message = validTypes?.length > 1 ? '*File must be one of' : '*File must be '

                setError(`${message} ${validTypes.join(',')}`)

                toast({
                    description: 'Invalid file type',
                    variant: 'destructive',
                })

                setFiles([])
                break
            }

            // if(!validTypes.includes(file.type)) continue;

            if (file.size > BYTE_IN_MB * maxSize) {
                setError(`*File must not be greater than ${maxSize}mb`)
                hasError &&
                    hasError(
                        'Your file must be 5MB or less to be uploaded. Please compress or reduce the file size.',
                    )

                setFiles([])

                break
            }

            tmpMedias.push({
                id: (index + file.size).toString(),
                name: file.name,
                url: URL.createObjectURL(file),
                type: file.type,
                size:
                    file.size > BYTE_IN_KB
                        ? file.size > BYTE_IN_MB
                            ? Math.round(file.size / BYTE_IN_MB) + 'mb'
                            : Math.round(file.size / BYTE_IN_KB) + 'kb'
                        : file.size + 'b',
                file: file,
            })

            index++

            if (!multiple) break
        }

        if (multiple) setFiles([...files, ...tmpMedias])
        else setFiles(tmpMedias)

        callback && callback()
    }

    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        if (isDisabled) return
    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        if (isDisabled) return

        const file: FileList = e.dataTransfer.files

        addMedia(file)
    }

    const cursorStyle = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'

    return (
        <div className='text-center'>
            <div onDrop={onDropHandler} onDragOver={onDragOverHandler} onClick={onClickHandler}>
                <button type='button' disabled={isDisabled}>
                    <div className='flex items-center justify-center'>
                        <div className='flex-row absolute justify-center'>
                            <div className=' flex justify-center'>
                                <input
                                    ref={fileInput}
                                    onChange={onChange}
                                    multiple={multiple}
                                    type='file'
                                    className='invisible h-0'
                                    accept={accept as string}
                                    disabled={isDisabled || profileStatus === 'INA'}
                                />
                            </div>
                        </div>
                        <div
                            className={cn(
                                'text-base block text-center mt-2',
                                labelClassname,
                                cursorStyle,
                            )}
                        >
                            {label ? label : 'Upload Image'}
                        </div>
                    </div>
                </button>
            </div>
            {error && <div className='text-red-500'>{error}</div>}
        </div>
    )
}

export default ImageUploader
