import { createAPIkey, getAPIKey } from '@/api/settings'
import { createAPIKeySchema, CreateAPIKeyType } from '@/api/settings/schema'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card'
import { Form } from '@/components/Form'
import { API_KEY_LABELS } from '@/constants'

import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useToast } from '@/hooks/useToast'
import { XIcon, EditIcon } from 'lucide-react'
import { logZodResolver } from '@/utils/helper'
import { Switch } from '@/components/Switch'

export const StragerDetectionForm = () => {
    const [enabled, setEnabled] = useState<boolean>(false)
    const { toast } = useToast()
    const apiForm = useForm<CreateAPIKeyType>({
        mode: 'all',
        resolver: logZodResolver(createAPIKeySchema),
    })

    const { data: apiKey, isLoading } = useQuery({
        queryKey: ['strangerDetectionSettings'],
        queryFn: () => getAPIKey(API_KEY_LABELS.STRANGER_DETECTION, 0),
    })

    const {
        handleSubmit,
        setValue,
        formState: { isDirty },
    } = apiForm

    const { mutate: createAPIKeyMu, isPending } = useMutation<
        unknown,
        AxiosError,
        CreateAPIKeyType
    >({
        mutationFn: createAPIkey,
        onSuccess: () => {
            toast({
                description: 'Snapshot Retention Days Updated',
            })

            setEnabled(false)
        },
    })

    const onSubmit = (data: CreateAPIKeyType) => {
        enabled && createAPIKeyMu(data)
    }

    useEffect(() => {
        if (apiForm.getValues('key') !== API_KEY_LABELS.STRANGER_DETECTION) {
            setValue('key', API_KEY_LABELS.STRANGER_DETECTION)
        }

        if (!isLoading && apiKey !== undefined) {
            setValue('value', apiKey.value)
        }
    }, [isLoading])

    return (
        <Card>
            <Form {...apiForm}>
                <form
                    autoComplete='on'
                    noValidate
                    className='w-full h-full'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CardHeader className='flex flex-row justify-between'>
                        <p className='font-semibold text-bms-gray-500'>Stranger Detection</p>
                        <Button
                            type='button'
                            className='flex flex-row gap-2 -mt-3'
                            variant='link'
                            onClick={() => setEnabled(!enabled)}
                        >
                            {enabled ? 'Cancel' : 'Edit'}
                            {enabled ? <XIcon /> : <EditIcon />}
                        </Button>
                    </CardHeader>
                    <CardContent className='flex flex-row gap-9 w-[100%]'>
                        <p>Strager Detection</p>
                        <Controller
                            name='value'
                            control={apiForm.control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value === 'true'} // Pass the value as checked
                                    onCheckedChange={(checked: boolean) => field.onChange(checked)}
                                />
                            )}
                        />
                    </CardContent>
                    <CardFooter className='justify-end'>
                        <Button type='submit' disabled={isPending || !isDirty || !enabled}>
                            Update
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
