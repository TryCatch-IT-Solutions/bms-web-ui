import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/Forms'
import { Input } from '@/components/Input'
import { BusinessProfileType } from '@/api/business/schema'
import { useAtom, useAtomValue } from 'jotai'
import { currentSubsInfoAtom, manageSubsTabAtom } from '@/store/manageSubs'
import { USER_STATUS } from '@/constants'
import PhoneNumberInput from '@/components/InputNumber'
import { Label } from '../Label'

export const AdminBusinessInput = () => {
    const { control } = useFormContext<BusinessProfileType>()
    const userStatus = useAtomValue(manageSubsTabAtom)
    const currentSubsInfo = useAtom(currentSubsInfoAtom)[0]


    const isUserTerminated = () => {
        if (userStatus === USER_STATUS.TERMINATED) return true
        return false
    }

    return (
        <div className='w-full h-full mt-8 flex-col'>
            <Label className='font-semibold text-[16px] text-zentive-green-dark'>
                Personal Information
            </Label>
            <div className='mt-[18px] w-full grid grid-cols-3 gap-x-[16px] gap-y-[18px]'>
                <FormField
                    control={control}
                    name='business.businessName'
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl>
                                <Input
                                    className='w-full'
                                    disabled={isUserTerminated()}
                                    placeholder='Business Name*'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name='firstName'
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl className='w-1/3'>
                                <Input
                                    className='w-full'
                                    disabled={isUserTerminated()}
                                    placeholder='First Name*'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name='lastName'
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl>
                                <Input
                                    className='w-full'
                                    disabled={
                                        !currentSubsInfo ||
                                        isUserTerminated()
                                    }
                                    placeholder='Last Name*'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl>
                                <Input
                                    disabled
                                    placeholder='Email Address*'
                                    type='email'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name='phoneNumber'
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl>
                                <PhoneNumberInput
                                    disabled={isUserTerminated()}
                                    className='w-full'
                                    inputProps={{
                                        name: 'Contact Number',
                                        placeholder: 'Business Contact Number',
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name='business.createdAt'
                    render={({ field }) => {
                        return (
                            <FormItem className='' aria-disabled>
                                <FormControl aria-disabled>
                                    <Input
                                        className='w-full'
                                        disabled
                                        placeholder='Date of Registration'
                                        type='text'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <FormField
                    control={control}
                    name='business.businessWebsite'
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl>
                                <Input
                                    className='w-full'
                                    disabled={isUserTerminated()}
                                    placeholder='Business Website (Optional)'
                                    type='text'
                                    {...field}
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
