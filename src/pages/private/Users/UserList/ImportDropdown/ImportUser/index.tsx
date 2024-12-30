import { useToast } from '@/hooks/useToast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useRef } from 'react'

import { importUsers } from '@/api/profile'
import { ImportUserType } from '@/api/profile/schema'

const ImportUsers = () => {
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const { toast } = useToast()

    const queryClient = useQueryClient()

    const { mutate: importUsersMu } = useMutation<unknown, AxiosError, ImportUserType>({
        mutationFn: importUsers,
        onSuccess: () => {
            toast({
                description: 'Users imported successfully',
            })
            queryClient.invalidateQueries({ queryKey: ['userList'] })
        },
        onError: (err: AxiosError) => {
            console.log('Create Employee Error: ', err.message)
            toast({
                description: `Something went wrong, please follow the input guide from the CSV template.`,
                variant: 'destructive',
            })
            if (inputFileRef.current) {
                inputFileRef.current.value = ''
            }
        },
    })

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files?.length > 0) {
            const file = files[0]
            importUsersMu({ file: file })
        }
    }

    const handleClick = () => {
        inputFileRef.current?.click()
    }

    return (
        <>
            <input
                type='file'
                accept='.csv,.xlsx,.xls'
                ref={inputFileRef}
                className='hidden'
                onChange={handleFileInputChange}
            />
            <button
                className='w-full h-8 hover:bg-[#00000029] text-left px-3'
                onClick={handleClick}
            >
                Import CSV
            </button>
        </>
    )
}

export default ImportUsers
