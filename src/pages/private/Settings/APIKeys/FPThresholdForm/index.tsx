import { createAPIkey, getAPIKey } from '@/api/settings'
import { createAPIKeySchema, CreateAPIKeyType } from '@/api/settings/schema'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import { API_KEY_LABELS } from '@/constants'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useToast } from '@/hooks/useToast'
import { XIcon, EditIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

export const FPTresholdForm = () => {
    const [enabled, setEnabled] = useState<boolean>(false)
    const { toast } = useToast()
    const apiForm = useForm<CreateAPIKeyType>({
        mode: 'all',
        resolver: zodResolver(createAPIKeySchema),
    })

    const queryClient = useQueryClient()

    const { data: apiKey, isLoading } = useQuery({
        queryKey: ['fpThresholdSettings'],
        queryFn: () => getAPIKey(API_KEY_LABELS.FINGERPRINT_SCORE_THRESHOLD, 0),
    })

    const {
        handleSubmit,
        setValue,
        formState: { errors, isDirty },
    } = apiForm

    const { mutate: createAPIKeyMu, isPending } = useMutation<
        unknown,
        AxiosError,
        CreateAPIKeyType
    >({
        mutationFn: createAPIkey,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fpThresholdSettings'] })
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
        if (apiForm.getValues('key') !== API_KEY_LABELS.FINGERPRINT_SCORE_THRESHOLD) {
            setValue('key', API_KEY_LABELS.FINGERPRINT_SCORE_THRESHOLD)
        }

        if (!isLoading && apiKey !== undefined) {
            setValue('value', apiKey.value)
        }
    }, [isLoading, apiKey])

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
                        <p className='font-semibold text-bms-gray-500'>
                            Fingerprint Score Threshold
                        </p>
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
                    <CardContent className='flex flex-col gap-9 w-[100%]'>
                        <FormField
                            control={apiForm.control}
                            name='value'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className='w-[30rem] xs:w-full sm:w-full bg-white h-11'
                                            placeholder='Fingerprint Score Threshold'
                                            type='number'
                                            disabled={!enabled}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>{errors?.key?.message}</FormMessage>
                                </FormItem>
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
