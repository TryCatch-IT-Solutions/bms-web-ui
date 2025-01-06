import { createAPIkey, getAPIKey } from '@/api/settings'
import { createAPIKeySchema, CreateAPIKeyType } from '@/api/settings/schema'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import { API_KEY_LABELS } from '@/constants'

import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

export const MapsForm = () => {
    const [enabled, setEnabled] = useState<boolean>(false)
    const emailAPIForm = useForm<CreateAPIKeyType>({
        mode: 'all',
        resolver: zodResolver(createAPIKeySchema),
    })

    const { data: mapsAPIKey } = useQuery({
        queryKey: ['mapsAPIKey'],
        queryFn: () => getAPIKey(API_KEY_LABELS.MAPS),
    })

    const {
        handleSubmit,
        setValue,
        setError,
        formState: { errors, isDirty },
    } = emailAPIForm

    // Set 'key' value on mount, ensuring it doesn't cause an infinite loop
    useEffect(() => {
        if (emailAPIForm.getValues('key') !== API_KEY_LABELS.MAPS) {
            setValue('key', API_KEY_LABELS.MAPS)
        }
    }, [setValue, emailAPIForm]) // Dependency on setValue and emailAPIForm to prevent infinite loop

    const { mutate: createAPIKeyMu, isPending } = useMutation<
        unknown,
        AxiosError,
        CreateAPIKeyType
    >({
        mutationFn: createAPIkey,
        onSuccess: () => {
            // handle success
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

    return (
        <Card>
            <Form {...emailAPIForm}>
                <form
                    autoComplete='on'
                    noValidate
                    className='w-full h-full'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CardHeader>
                        <p className='font-semibold text-bms-gray-500'>Google Maps API Key</p>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={emailAPIForm.control}
                            name='value'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className='mt-[16px] w-[100%] bg-white'
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
                        <Button
                            type='submit'
                            disabled={isPending || !isDirty}
                            onClick={() => setEnabled(!enabled)}
                        >
                            {mapsAPIKey || !enabled ? 'Edit' : 'Update'}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
