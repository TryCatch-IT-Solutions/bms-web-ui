import { pushPullRecordToDevice } from '@/api/device'
import { PushPullRecordType } from '@/api/device/schema'
import { Button } from '@/components/Button'
import Spinner from '@/components/Spinner'
import { useToast } from '@/hooks/useToast'
import { DownloadIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface PullRecordProps {
    id: number
    disabled: boolean
}

export const PullRecord: React.FC<PullRecordProps> = ({ id, disabled }) => {
    const { toast } = useToast()

    const { mutate: pullMu, isPending } = useMutation<unknown, AxiosError, PushPullRecordType>({
        mutationFn: pushPullRecordToDevice,
        onSuccess: () => {
            toast({
                description: `Pulled Records Successfully from device ${id}`,
            })
        },
    })

    const handleClick = (data: PushPullRecordType) => {
        pullMu(data)
    }

    return (
        <Button
            className='bg-blue-500 hover:bg-blue-500/50'
            onClick={() =>
                handleClick({
                    id: id,
                    action: 'pull',
                })
            }
            disabled={disabled}
        >
            {isPending ? (
                <Spinner variant={'normal'} className='w-4 h-4 border-color-white' />
            ) : (
                <DownloadIcon />
            )}
        </Button>
    )
}
