import { FormField, FormItem, FormControl, FormMessage } from '@/components/Forms'
import { Input } from '@/components/Input'
import { FullAddress } from '@/hooks/useGeocode'
import { useAtom } from 'jotai'
import { useFormContext } from 'react-hook-form'
import { USER_STATUS } from '@/constants'
import { useCallback, useEffect, useState } from 'react'
import { Label } from '../Label'
import { isAddressSelectedAtom } from '@/store/customer'
import { cn } from '@/utils/helper'
import { FC } from 'react'
import InputAddress from '../InputAddress'

type CompleteAddressProps = {
    className?: string
    streetAddressOne?: string
    streetAddressTwo?: string
    title?: string
    titleClassName?: string
}
type Fields = 'city' | 'state' | 'zipCode'
type Value = string | undefined

const CompleteAddress: FC<CompleteAddressProps> = ({
    className,
    streetAddressOne = 'address.streetAddress',
    streetAddressTwo = 'address.streetTwoAddress',
    title = 'Complete Address',
    titleClassName = '',
}) => {
    const { control, clearErrors, getValues, setValue, watch } = useFormContext()
    const [isAddressSelected, setIsAddressSelected] = useAtom(isAddressSelectedAtom)

    const city = watch('address.city')
    const state = watch('address.state')
    const streetAddress = watch(streetAddressOne)
    const userStatus = getValues('status')
    const zipCode = watch('address.zipCode')

    const [isEditing, setIsEditing] = useState({
        city: false,
        state: false,
        zipCode: false,
    })

    const handlePlaceSelected = async (fullAddress: FullAddress) => {
        setIsAddressSelected(true)
        setValue(streetAddressOne, fullAddress.streetAddress, { shouldValidate: true })
        setValue('address.city', fullAddress.city, { shouldValidate: true })
        setValue('address.state', fullAddress.state, { shouldValidate: true })
        setValue('address.zipCode', fullAddress.zipCode, { shouldValidate: true })
    }

    const handleLocationChange = useCallback(
        (field: Fields, value: Value, onChange: (val: Value) => void) => {
            setIsEditing((prev) => ({ ...prev, [field]: true }))
            onChange(value)
        },
        [setIsEditing],
    )

    const isUserTerminated = userStatus === USER_STATUS.TERMINATED
    const isUserDeactivated = userStatus === USER_STATUS.INACTIVE

    const isValid = (fieldName: Fields, watchedField: Value) =>
        !isAddressSelected || (isAddressSelected && !isEditing[fieldName] && !!watchedField)

    useEffect(() => {
        if (streetAddress?.length === 0) {
            setIsAddressSelected(false)
            setValue('address.city', '')
            setValue('address.state', '')
            setValue('address.zipCode', '')
            clearErrors('address.city')
            clearErrors('address.state')
            clearErrors('address.zipCode')
        }
    }, [streetAddress, setIsAddressSelected, setValue])

    return (
        <div className={cn('h-full w-full ', className)}>
            <div className='grid grid-cols-3 gap-x-[16px] gap-y-[18px]'>
                <Label
                    className={cn(
                        'font-semibold text-[16px] text-zentive-green-dark w-full col-span-3',
                        titleClassName,
                    )}
                >
                    {title}
                </Label>
                <FormField
                    control={control}
                    name={streetAddressOne}
                    render={({ field }) => (
                        <FormItem className='col-span-3'>
                            <FormControl>
                                <InputAddress
                                    {...field}
                                    onPlaceSelected={handlePlaceSelected}
                                    placeholder='Street 1'
                                    className='text-base'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name={streetAddressTwo}
                    render={({ field }) => (
                        <FormItem className='col-span-3'>
                            <FormControl>
                                <Input
                                    disabled={isUserTerminated || isUserDeactivated}
                                    type='text'
                                    placeholder='Street 2 (Optional)'
                                    className='text-base'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name='address.city'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isValid('city', city)}
                                    onChange={(e) =>
                                        handleLocationChange('city', e.target.value, field.onChange)
                                    }
                                    placeholder='City*'
                                    type='text'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name='address.state'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='text'
                                    placeholder='State*'
                                    disabled={isValid('state', state)}
                                    onChange={(e) =>
                                        handleLocationChange(
                                            'state',
                                            e.target.value,
                                            field.onChange,
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name='address.zipCode'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='text'
                                    disabled={isValid('zipCode', zipCode)}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        if (value?.length <= 5) {
                                            return handleLocationChange(
                                                'zipCode',
                                                value,
                                                field.onChange,
                                            )
                                        }
                                    }}
                                    placeholder='Zip Code*'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
export default CompleteAddress
