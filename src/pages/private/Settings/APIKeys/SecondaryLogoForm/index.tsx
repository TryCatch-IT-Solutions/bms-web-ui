import { uploadLogo, getAPIKey } from '@/api/settings'
import { uploadLogoSchema, UploadLogoType } from '@/api/settings/schema'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { API_KEY_LABELS } from '@/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useToast } from '@/hooks/useToast'
import { XIcon, EditIcon } from 'lucide-react'
import daiLogo from '@/assets/dai-logo.png'
import ImageUploader from '@/components/ImageUploader'
import { zodResolver } from '@hookform/resolvers/zod'
import { LOGO_URL } from '@/api/axiosInstance'

export const SecondaryLogoForm = () => {
    const [enabled, setEnabled] = useState<boolean>(false)
    const { toast } = useToast()
    const apiForm = useForm<UploadLogoType>({
        mode: 'all',
        resolver: zodResolver(uploadLogoSchema),
    })

    const queryKey = useQueryClient()

    const { data: apiKey, isLoading } = useQuery({
        queryKey: ['dynamicSecondaryLogo'],
        queryFn: () => getAPIKey(API_KEY_LABELS.SECONDARY_LOGO, 0),
    })

    const {
        handleSubmit,
        setValue,
        formState: { errors, isDirty },
    } = apiForm

    const { mutate: createAPIKeyMu, isPending } = useMutation<unknown, AxiosError, UploadLogoType>({
        mutationFn: uploadLogo,
        onSuccess: () => {
            queryKey.invalidateQueries({ queryKey: ['dynamicSecondaryLogo'] })
            toast({
                description: 'Logo Updated Successfully',
            })

            setEnabled(false)
        },
    })

    const onSubmit = (data: UploadLogoType) => {
        enabled && createAPIKeyMu(data)
    }

    useEffect(() => {
        if (apiForm.getValues('key') !== API_KEY_LABELS.SECONDARY_LOGO) {
            setValue('key', API_KEY_LABELS.SECONDARY_LOGO)
        }
    }, [isLoading])

    return (
        <Card>
            <Form {...apiForm}>
                <form
                    autoComplete='on'
                    noValidate
                    className='w-full h-full w-[33rem]'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CardHeader className='flex flex-row justify-between'>
                        <p className='font-semibold text-bms-gray-500'>Secondary Logo</p>
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
                    <CardContent className='flex flex-row items-center gap-9 w-[100%]'>
                        <FormField
                            control={apiForm.control}
                            name='value'
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <ImageUploader
                                            onFilesChange={(data) => {
                                                setValue('value', data[0]?.file)
                                            }}
                                            maxSize={4.9}
                                            accept='.png,.jpeg,.jpg'
                                            label='Change Logo'
                                            isDisabled={!enabled}
                                            labelClassname='text-zentive-blue-dark text-decoration-line: underline'
                                        />
                                    </FormControl>
                                    <FormMessage>{errors?.value?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        {apiKey?.value !== undefined && apiKey?.value !== '' ? (
                            <img src={LOGO_URL + apiKey?.value} />
                        ) : (
                            <img src={daiLogo} className='w-[50%]' />
                        )}
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
