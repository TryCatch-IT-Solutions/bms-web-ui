import { updateDevice, getDeviceById } from '@/api/device'
import { deviceSchema, DeviceType } from '@/api/device/schema'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter } from '@/components/Card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import Spinner from '@/components/Spinner'
import { useToast } from '@/hooks/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export const EditDeviceForm: React.FC = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const { id } = useParams()

    const [location, setLocation] = useState({
        latitude: 0.0,
        longitude: 0.0,
        error: '',
    })

    const { data: device, isLoading } = useQuery({
        queryKey: ['editDevice', id],
        enabled: !!id,
        queryFn: () => getDeviceById(Number(id) ?? 0),
    })

    const deviceForm = useForm<DeviceType>({
        mode: 'onChange',
        resolver: zodResolver(deviceSchema),
        defaultValues: {
            id: device?.id,
            model: device?.model,
            serial_no: device?.serial_no,
        },
    })

    const {
        handleSubmit,
        setValue,
        formState: { isValid, errors, isDirty },
    } = deviceForm

    const { mutate: updateDeviceMu } = useMutation({
        mutationFn: updateDevice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['deviceList'] })
            navigate('/device/list')

            toast({
                description: 'Device Created Successfully',
                duration: 2000,
            })
        },
        onError: (err: any) => {
            toast({
                description: err?.response?.data?.message,
                variant: 'destructive',
            })
        },
    })

    const onSubmit = (data: DeviceType) => {
        updateDeviceMu(data)
    }

    useEffect(() => {
        // Check if geolocation is available
        if ('geolocation' in navigator) {
            // Get the current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Update state with latitude and longitude
                    setLocation({
                        latitude: position.coords.latitude ?? 0.0,
                        longitude: position.coords.longitude ?? 0.0,
                        error: '',
                    })
                },
                (err) => {
                    // Handle any errors
                    setLocation({
                        latitude: 0.0,
                        longitude: 0.0,
                        error: err.message,
                    })
                },
            )
        } else {
            setLocation({
                latitude: 0.0,
                longitude: 0.0,
                error: 'Geolocation is not supported by this browser.',
            })
        }

        if (device) {
            deviceForm.reset(device)
        }
    }, [device])

    useEffect(() => {
        setValue('group_id', 1)
        setValue('lat', location.latitude)
        setValue('lon', location.longitude)
    }, [location])

    return (
        <Form {...deviceForm}>
            <form
                autoComplete='on'
                noValidate
                className='w-full h-full max-w-[80%]'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Card>
                    <CardContent className='flex flex-col gap-5 pt-5 items-center justify-center min-h-[10rem]'>
                        {isLoading ? (
                            <Spinner variant='normal' className='h-[5rem] w-[5rem]' />
                        ) : (
                            <div className='flex flex-row gap-5'>
                                <FormField
                                    control={deviceForm.control}
                                    name='model'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className='mt-[16px] w-[100%] bg-white'
                                                    placeholder='Device Model'
                                                    type='text'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>{errors?.model?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={deviceForm.control}
                                    name='serial_no'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className='mt-[16px] w-[100%] bg-white'
                                                    placeholder='Serial Number'
                                                    type='text'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>{errors?.model?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className='flex flex-row gap-5 items-center justify-center'>
                        {!isLoading && (
                            <>
                                <Button
                                    variant='outline'
                                    className='w-1/5'
                                    onClick={() => navigate('/device/list')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    className='w-1/5'
                                    disabled={!isValid || !isDirty}
                                >
                                    Submit
                                </Button>
                            </>
                        )}
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
