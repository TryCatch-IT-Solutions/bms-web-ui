import { pushPullRecordToDevice } from '@/api/device'
import { PushPullRecordType } from '@/api/device/schema'
import { Button } from '@/components/Button'
import Spinner from '@/components/Spinner'
import { useToast } from '@/hooks/useToast'
import { UploadIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface PullRecordProps {
    id: number
}

export const PushRecord: React.FC<PullRecordProps> = ({ id }) => {
    const { toast } = useToast()

    const { mutate: pushMu, isPending } = useMutation<unknown, AxiosError, PushPullRecordType>({
        mutationFn: pushPullRecordToDevice,
        onSuccess: () => {
            toast({
                description: `Pushed Records Successfully to device ${id}`,
            })
        },
    })

    const handleClick = (data: PushPullRecordType) => {
        pushMu(data)
    }

    return (
        <Button
            onClick={() =>
                handleClick({
                    id: id,
                    action: 'push',
                })
            }
        >
            {isPending ? (
                <Spinner variant={'normal'} className='w-4 h-4 border-color-white' />
            ) : (
                <UploadIcon />
            )}
        </Button>
    )
}
