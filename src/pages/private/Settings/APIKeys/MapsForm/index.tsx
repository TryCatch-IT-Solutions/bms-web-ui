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
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/useToast'
import { XIcon, EditIcon } from 'lucide-react'
import { maskApiKey } from '@/utils/crypto'

export const MapsForm = () => {
    const [enabled, setEnabled] = useState<boolean>(false)
    const { toast } = useToast()

    const queryClient = useQueryClient()

    const apiForm = useForm<CreateAPIKeyType>({
        mode: 'all',
        resolver: zodResolver(createAPIKeySchema),
    })

    const { data: apiKey, isLoading } = useQuery({
        queryKey: ['mapsAPIKey'],
        queryFn: () => getAPIKey(API_KEY_LABELS.MAPS, 0),
    })

    const {
        handleSubmit,
        setValue,
        setError,
        formState: { errors, isDirty },
    } = apiForm

    const { mutate: createAPIKeyMu, isPending } = useMutation<
        unknown,
        AxiosError,
        CreateAPIKeyType
    >({
        mutationFn: createAPIkey,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mapsAPIKey'] })
            toast({
                description: 'Google Maps API Key Updated',
            })

            setEnabled(false)
        },
        onError: (error) => {
            if (error.response?.status === 409) {
                setError('key', {
                    type: 'manual',
                    message: 'API Key already exists',
                })
            }
        },
    })

    const onSubmit = (data: CreateAPIKeyType) => {
        enabled && createAPIKeyMu(data)
    }

    useEffect(() => {
        if (apiForm.getValues('key') !== API_KEY_LABELS.MAPS) {
            setValue('key', API_KEY_LABELS.MAPS)
        }

        if (!isLoading && apiKey !== undefined) {
            if (enabled) {
                setValue('value', apiKey.value)
            } else {
                setValue('value', maskApiKey(apiKey.value))
            }
        }
    }, [isLoading, enabled, apiKey])

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
                        <p className='font-semibold text-bms-gray-500'>Google Maps API Key</p>
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
                    <CardContent className='flex flex-row items-center justify-center w-[100%]'>
                        <FormField
                            control={apiForm.control}
                            name='value'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className='w-[30rem] xs:w-full sm:w-full bg-white h-11'
                                            placeholder='Google Maps API Key'
                                            type='text'
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
