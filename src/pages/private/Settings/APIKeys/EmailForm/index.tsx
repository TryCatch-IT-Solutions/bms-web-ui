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
import { useToast } from '@/hooks/useToast'

export const EmailForm = () => {
    const [enabled, setEnabled] = useState<boolean>(false)
    const { toast } = useToast()
    const apiForm = useForm<CreateAPIKeyType>({
        mode: 'all',
        resolver: zodResolver(createAPIKeySchema),
    })

    const { data: apiKey, isLoading } = useQuery({
        queryKey: ['emailAPIkey'],
        queryFn: () => getAPIKey(API_KEY_LABELS.EMAIL),
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
        if (apiForm.getValues('key') !== API_KEY_LABELS.EMAIL) {
            setValue('key', API_KEY_LABELS.EMAIL)
        }

        if (!isLoading && apiKey !== undefined) {
            setValue('value', apiKey)
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
                    <CardHeader>
                        <p className='font-semibold text-bms-gray-500'>Email API Key</p>
                    </CardHeader>
                    <CardContent className='flex flex-row items-center justify-center w-[100%]'>
                        <FormField
                            control={apiForm.control}
                            name='value'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className='w-[30rem] bg-white h-11'
                                            placeholder='Email API Key'
                                            type='text'
                                            disabled={!enabled}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>{errors?.key?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type='button' onClick={() => setEnabled(!enabled)}>
                            {enabled ? 'Cancel' : 'Edit'}
                        </Button>
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
