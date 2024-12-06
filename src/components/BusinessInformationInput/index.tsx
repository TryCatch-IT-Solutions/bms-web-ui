import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/Forms'
import { Input } from '@/components/Input'
import { BusinessProfileType } from '@/api/business/schema'
import { useAtom, useAtomValue } from 'jotai'
import { manageSubsTabAtom } from '@/store/manageSubs'
import { ROLE, USER_STATUS } from '@/constants'
import { isViewedAsAtom, userAtom, viewedAsUserAtom } from '@/store/auth'
import { Label } from '../Label'

export const BusinessInformationInput = () => {
    const { control } = useFormContext<BusinessProfileType>()
    const userStatus = useAtomValue(manageSubsTabAtom)
    const isViewedAsOwner = useAtomValue(isViewedAsAtom)
    const [user] = useAtom(isViewedAsOwner ? viewedAsUserAtom : userAtom)

    const isOwner = user?.role.roleName === ROLE.OWNER || user?.role.roleName === ROLE.CO_OWNER

    const isUserTerminated = () => {
        if (userStatus === USER_STATUS.TERMINATED) return true
        return false
    }

    if (isOwner) {
        return (
            <div className='w-full h-full mt-8 flex-col'>
                <Label className='font-semibold text-[16px] text-zentive-green-dark'>
                    Business Information
                </Label>
                <div className='mt-[18px] w-full grid grid-cols-3 gap-x-[16px] gap-y-[18px]'>
                    <FormField
                        control={control}
                        name={'business.businessName'}
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
                        name='business.businessWebsite'
                        render={({ field }) => (
                            <FormItem className=''>
                                <FormControl>
                                    <Input
                                        className='w-full'
                                        disabled={isUserTerminated()}
                                        placeholder='Business Website*'
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

    return null
}
