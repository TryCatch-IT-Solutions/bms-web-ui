import { createDevice } from '@/api/device'
import { createDeviceSchema, CreateDeviceType } from '@/api/device/schema'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter } from '@/components/Card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import { useToast } from '@/hooks/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import GroupListModal from './GroupListModal'
import { useAtom } from 'jotai'
import { createDeviceGroupAtom } from '@/store/device'

export const CreateDeviceForm: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const [deviceGroupAtom, setDeviceGroupAtom] = useAtom(createDeviceGroupAtom)

    const [location, setLocation] = useState({
        latitude: 0.0,
        longitude: 0.0,
        error: '',
    })

    const deviceForm = useForm<CreateDeviceType>({
        mode: 'all',
        resolver: zodResolver(createDeviceSchema),
    })

    const {
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = deviceForm

    const { mutate: createDeviceMu, isPending } = useMutation({
        mutationFn: createDevice,
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

    const onSubmit = (data: CreateDeviceType) => {
        createDeviceMu(data)
    }

    useEffect(() => {
        setDeviceGroupAtom(null)
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
    }, [])

    useEffect(() => {
        setValue('lat', location.latitude)
        setValue('lon', location.longitude)
    }, [location])

    const isValid =
        getValues('model') !== '' && getValues('serial_no') !== '' && deviceGroupAtom !== null

    return (
        <Form {...deviceForm}>
            <form
                autoComplete='on'
                noValidate
                className='w-full h-full max-w-[80%]'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Card>
                    <CardContent className='flex flex-col gap-5 pt-5 items-center justify-center'>
                        <div className='flex flex-col gap-5'>
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
                            <div className='flex flex-row gap-5 items-center w-full justify-start w-full'>
                                <p>Group: </p>
                                <Button
                                    type='button'
                                    className='bg-bms-gray-500 w-[15rem]'
                                    onClick={() => setOpen(true)}
                                >
                                    {deviceGroupAtom !== null
                                        ? deviceGroupAtom.name
                                        : 'Select Group'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-row gap-5 items-center justify-center'>
                        <Button
                            variant='outline'
                            className='w-1/5'
                            onClick={() => navigate('/device/list')}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' className='w-1/5' disabled={!isValid || isPending}>
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
                <GroupListModal open={open} setOpen={setOpen} control={deviceForm} />
            </form>
        </Form>
    )
}
