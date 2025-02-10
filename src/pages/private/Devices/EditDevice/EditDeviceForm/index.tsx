import { updateDevice, getDeviceById } from '@/api/device'
import { deviceSchema, DeviceType } from '@/api/device/schema'
import { Button } from '@/components/Button'
import { Card, CardContent, CardFooter } from '@/components/Card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form'
import { Input } from '@/components/Input'
import Spinner from '@/components/Spinner'
import { Switch } from '@/components/Switch'
import { useToast } from '@/hooks/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export const EditDeviceForm: React.FC = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const { id } = useParams()

    const { data: device, isLoading } = useQuery({
        queryKey: ['editDevice', id],
        enabled: !!id,
        queryFn: () => getDeviceById(Number(id) ?? 0),
    })

    const deviceForm = useForm<DeviceType>({
        mode: 'onChange',
        resolver: zodResolver(deviceSchema),
        defaultValues: {
            ...device,
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
        if (device) {
            deviceForm.reset(device)
        }
    }, [device])

    useEffect(() => {
        setValue('group_id', 1)
    }, [location])

    return (
        <Form {...deviceForm}>
            <form
                autoComplete='on'
                noValidate
                className='w-full h-full max-w-[80%] xs:max-w-full sm:max-w-full'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Card>
                    <CardContent className='flex flex-col gap-5 pt-5 items-center justify-center min-h-[10rem]'>
                        {isLoading ? (
                            <Spinner variant='normal' className='h-[5rem] w-[5rem]' />
                        ) : (
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-row xs:flex-col sm:flex-col gap-5'>
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

                                <div className='flex flex-row gap-5 items-center'>
                                    <div className='w-full flex flex-row justify-between'>
                                        <label>Check In</label>
                                        <Controller
                                            name='check_in'
                                            control={deviceForm.control}
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value ?? false} // Pass the value as checked
                                                    onCheckedChange={(checked: boolean) =>
                                                        field.onChange(checked)
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='w-full flex flex-row justify-between'>
                                        <label>Check Out</label>
                                        <Controller
                                            name='check_out'
                                            control={deviceForm.control}
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value ?? false} // Pass the value as checked
                                                    onCheckedChange={(checked: boolean) =>
                                                        field.onChange(checked)
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-row gap-5 items-center'>
                                    <div className='w-full flex flex-row justify-between'>
                                        <label>Break In</label>
                                        <Controller
                                            name='break_in'
                                            control={deviceForm.control}
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value ?? false} // Pass the value as checked
                                                    onCheckedChange={(checked: boolean) =>
                                                        field.onChange(checked)
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='w-full flex flex-row justify-between'>
                                        <label>Break Out</label>
                                        <Controller
                                            name='break_out'
                                            control={deviceForm.control}
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value ?? false} // Pass the value as checked
                                                    onCheckedChange={(checked: boolean) =>
                                                        field.onChange(checked)
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-row gap-5 items-center'>
                                    <div className='w-full flex flex-row justify-between'>
                                        <label>Overtime In</label>
                                        <Controller
                                            name='overtime_in'
                                            control={deviceForm.control}
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value ?? false} // Pass the value as checked
                                                    onCheckedChange={(checked: boolean) =>
                                                        field.onChange(checked)
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='w-full flex flex-row justify-between'>
                                        <label>Overtime Out</label>
                                        <Controller
                                            name='overtime_out'
                                            control={deviceForm.control}
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value ?? false} // Pass the value as checked
                                                    onCheckedChange={(checked: boolean) =>
                                                        field.onChange(checked)
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-row gap-5 items-center'>
                                    <div className='flex flex-row justify-between w-[47.7%]'>
                                        <label>Manual Time Entry</label>
                                        <Controller
                                            name='manual_time_entry'
                                            control={deviceForm.control}
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value ?? false} // Pass the value as checked
                                                    onCheckedChange={(checked: boolean) =>
                                                        field.onChange(checked)
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className='flex flex-row gap-5 items-center justify-center'>
                        {!isLoading && (
                            <>
                                <Button
                                    variant='outline'
                                    className='w-1/5 xs:w-full sm:w-full'
                                    onClick={() => navigate('/device/list')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    className='w-1/5 xs:w-full sm:w-full'
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
