import { CustomerProfileType } from '@/api/profile/schema'
import { FormField, FormItem, FormControl, FormMessage } from '@/components/Forms'
import { Input } from '@/components/Input'
import { InputLocation } from '@/components/InputLocation'
import { FullAddress } from '@/hooks/useGeocode'
import { useAtomValue } from 'jotai'
import { useFormContext } from 'react-hook-form'
import GoogleMapsApiWrapper from '@/components/GoogleMapsApiWrapper'
import { manageSubsTabAtom } from '@/store/manageSubs'
import { USER_STATUS } from '@/constants'
import { useCallback, useState } from 'react'
import { InputProps } from '../InputPassword'
import { Label } from '../Label'

type Fields = 'city' | 'state' | 'zipCode'
type Value = string | undefined

type InputLocationProps = Omit<InputProps, 'type'> & {
    isAddressSelected: boolean
    setIsAddressSelected: React.Dispatch<React.SetStateAction<boolean>>
}

const CompleteAddress = (props: InputLocationProps) => {
    const { control, setValue, watch } = useFormContext<CustomerProfileType>()
    const userStatus = useAtomValue(manageSubsTabAtom)
    const city = watch('address.city')
    const state = watch('address.state')
    const zipCode = watch('address.zipCode')
    const [isEditing, setIsEditing] = useState({
        city: false,
        state: false,
        zipCode: false,
    })

    const handlePlaceSelected = async (fullAddress: FullAddress) => {
        props.setIsAddressSelected(true)
        setValue('address.streetAddress', fullAddress.streetAddress, { shouldValidate: true })
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

    const isUserTerminated = () => {
        if (userStatus === USER_STATUS.TERMINATED) return true
        return false
    }

    const isValid = (fieldName: Fields, watchedField: Value) =>
        !props.isAddressSelected ||
        (props.isAddressSelected && !isEditing[fieldName] && !!watchedField)

    return (
        <div className='h-full w-full'>
            <div className='grid grid-cols-3 gap-x-[16px] gap-y-[18px]'>
                <Label className='font-semibold text-[16px]  text-zentive-green-dark'>
                    Complete Address
                </Label>
                <FormField
                    control={control}
                    name='address.streetAddress'
                    render={({ field }) => (
                        <FormItem className='col-span-3'>
                            <FormControl>
                                <GoogleMapsApiWrapper
                                    render={(isLoaded: boolean, loadError?: Error) => {
                                        if (!isLoaded || loadError) return null

                                        return (
                                            <InputLocation
                                                disabled={isUserTerminated()}
                                                autocompleteType='address'
                                                onPlaceSelected={handlePlaceSelected}
                                                {...field}
                                                onKeyUp={() => {
                                                    props.setIsAddressSelected(false)
                                                }}
                                                placeholder='Street 1*'
                                                isLoaded={isLoaded}
                                            />
                                        )
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name='address.streetTwoAddress'
                    render={({ field }) => (
                        <FormItem className='col-span-3'>
                            <FormControl>
                                <Input
                                    disabled={isUserTerminated()}
                                    type='text'
                                    placeholder='Street 2 (Optional)'
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
