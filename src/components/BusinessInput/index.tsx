import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/Forms'
import { Input } from '@/components/Input'
import { BusinessProfileType } from '@/api/business/schema'
import { useAtom, useAtomValue } from 'jotai'
import { currentSubsInfoAtom, manageSubsTabAtom } from '@/store/manageSubs'
import { ROLE, USER_STATUS } from '@/constants'
import PhoneNumberInput from '@/components/InputNumber'
import { isViewedAsAtom, userAtom, viewedAsUserAtom } from '@/store/auth'
import { Label } from '../Label'
export const BusinessInput = () => {
    const { control } = useFormContext<BusinessProfileType>()
    const userStatus = useAtomValue(manageSubsTabAtom)
    const isViewedAsOwner = useAtomValue(isViewedAsAtom)
    const [user] = useAtom(isViewedAsOwner ? viewedAsUserAtom : userAtom)
    const currentSubsInfo = useAtom(currentSubsInfoAtom)[0]

    const isCustomer = user?.role.roleName === ROLE.CUSTOMER
    const isOwner = user?.role.roleName === ROLE.OWNER || user?.role.roleName === ROLE.CO_OWNER
    const isAdmin = user?.role.roleName === ROLE.ADMIN

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
                    name={
                        isCustomer || !currentSubsInfo || isOwner
                            ? 'firstName'
                            : 'business.businessName'
                    }
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl>
                                <Input
                                    className='w-full'
                                    disabled={isUserTerminated()}
                                    placeholder={
                                        isCustomer || !currentSubsInfo || isOwner
                                            ? 'First Name*'
                                            : 'Business Name*'
                                    }
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
                    name={isCustomer || !currentSubsInfo || isOwner ? 'lastName' : 'firstName'}
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl className='w-1/3'>
                                <Input
                                    className='w-full'
                                    disabled={isUserTerminated()}
                                    placeholder={
                                        isCustomer || !currentSubsInfo || isOwner
                                            ? 'Last Name*'
                                            : 'First Name*'
                                    }
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
                    name={isCustomer || !currentSubsInfo || isOwner ? 'email' : 'lastName'}
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormControl>
                                <Input
                                    className='w-full'
                                    disabled={
                                        isCustomer ||
                                        !currentSubsInfo ||
                                        isOwner ||
                                        isUserTerminated()
                                    }
                                    placeholder={
                                        isCustomer || !currentSubsInfo || isOwner
                                            ? 'Email Address*'
                                            : 'Last Name*'
                                    }
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isCustomer || isOwner || (isAdmin && !currentSubsInfo) ? (
                    <>
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
                                                placeholder: 'Contact Number*',
                                            }}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                ) : null}

                {!isCustomer && currentSubsInfo && !isOwner && (
                    <>
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

                        {/* </div> */}

                        {/* <div className='mt-[18px] w-2/3 flex flex-row gap-4'> */}

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
                    </>
                )}
            </div>
        </div>
    )
}
