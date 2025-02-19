import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Modal } from '@/components/Modal'
import { bulkSettingsUpdateSchema, BulkSettingsUpdateType } from '@/api/device/schema'
import { Controller, useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { Switch } from '@/components/Switch'
import { Button } from '@/components/Button'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { bulkDeviceSettingsUpdate } from '@/api/device'
import { useToast } from '@/hooks/useToast'
import { useAtom } from 'jotai'
import { deleteDeviceAtom } from '@/store/device'
import { zodResolver } from '@hookform/resolvers/zod'

interface BulkSettingsUpdateModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const BulkSettingsUpdateModal: React.FC<BulkSettingsUpdateModalProps> = ({ open, setOpen }) => {
    const [selectedDevices, setSelectedDevices] = useAtom(deleteDeviceAtom)

    const [enable, setEnable] = useState<boolean>(false)

    const deviceForm = useForm<BulkSettingsUpdateType>({
        mode: 'onChange',
        resolver: zodResolver(bulkSettingsUpdateSchema),
        defaultValues: {
            manual_time_entry: false,
            check_in: false,
            check_out: false,
            break_in: false,
            break_out: false,
            overtime_in: false,
            overtime_out: false,
        },
    })

    const { toast } = useToast()

    const { handleSubmit, setValue } = deviceForm

    const { mutate: updateDevicesMu, isPending } = useMutation<
        unknown,
        AxiosError,
        BulkSettingsUpdateType
    >({
        mutationFn: bulkDeviceSettingsUpdate,
        onSuccess: () => {
            setSelectedDevices(null)
            toast({
                description: 'Devices Updated Successfully',
            })
            setOpen(false)
        },
    })

    const onSubmit = (data: BulkSettingsUpdateType) => {
        updateDevicesMu(data)
    }

    const handleManualTimeEntry = (checked: boolean) => {
        if (!checked) {
            setValue('check_in', false)
            setValue('check_out', false)
            setValue('break_in', false)
            setValue('break_out', false)
            setValue('overtime_in', false)
            setValue('overtime_out', false)
        }
    }

    useEffect(() => {
        if (selectedDevices?.devices !== undefined) {
            setValue('ids', selectedDevices?.devices)
        }
    }, [selectedDevices])

    return (
        <Modal
            isOpen={open}
            isHideCloseButton
            onClose={() => {
                setOpen(false)
            }}
            title=''
            titleClassName=''
            containerClassName='max-w-[20rem]'
        >
            <Form {...deviceForm}>
                <form
                    autoComplete='on'
                    noValidate
                    className='w-full h-full'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <p className='text-center font-semibold text-bms-gray-500 text-lg'>
                        Update Device Settings
                    </p>

                    <div className='flex flex-col gap-5 items-center justify-center p-5'>
                        <div className='w-full flex flex-row justify-between'>
                            <label>Manual Time Entry</label>
                            <Controller
                                name='manual_time_entry'
                                control={deviceForm.control}
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value ?? false} // Pass the value as checked
                                        onCheckedChange={(checked: boolean) => {
                                            field.onChange(checked)
                                            setEnable(!enable)
                                            handleManualTimeEntry(checked)
                                        }}
                                    />
                                )}
                            />
                        </div>
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
                                        disabled={!enable}
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
                                        disabled={!enable}
                                    />
                                )}
                            />
                        </div>

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
                                        disabled={!enable}
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
                                        disabled={!enable}
                                    />
                                )}
                            />
                        </div>

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
                                        disabled={!enable}
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
                                        disabled={!enable}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row gap-5 p-5 bg-bms-gray-300 justify-end'>
                        <Button
                            variant='outline'
                            className='w-full'
                            disabled={isPending}
                            onClick={() => setOpen(false)}
                            type='button'
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={
                                isPending || selectedDevices?.devices?.length === 0 || !enable
                            }
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}

export default BulkSettingsUpdateModal
