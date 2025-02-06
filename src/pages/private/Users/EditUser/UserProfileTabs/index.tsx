import { ROLE, USER_PROFILE_TABS } from '@/constants'
import { userAtom, userProfileTabsAtom } from '@/store/user'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useAtomValue, useSetAtom } from 'jotai'

export const UserProfileTabs: React.FC = () => {
    const setSelected = useSetAtom(userProfileTabsAtom)

    const user = useAtomValue(userAtom)

    const onSwitchTab = (status: string) => {
        setSelected(status)
    }

    return (
        <Tabs
            defaultValue={USER_PROFILE_TABS.PROFILE}
            onValueChange={(val) => setSelected(val)}
            className='bg-white rounded-md w-full'
        >
            <TabsList className='w-full flex flex-row mt-[26px] max-w-[80%] space-x-4'>
                <TabsTrigger
                    onClick={() => onSwitchTab(USER_PROFILE_TABS.PROFILE)}
                    value={USER_PROFILE_TABS.PROFILE}
                    className={
                        'w-1/2 h-[54px] text-lg xs:text-sm text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                    }
                >
                    Profile Information
                </TabsTrigger>
                {user?.role === ROLE.superadmin && (
                    <TabsTrigger
                        onClick={() => onSwitchTab(USER_PROFILE_TABS.PASSWORD)}
                        value={USER_PROFILE_TABS.PASSWORD}
                        className={
                            'w-1/2 h-[54px] text-lg xs:text-sm text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                        }
                    >
                        Bypass Password
                    </TabsTrigger>
                )}
            </TabsList>
        </Tabs>
    )
}
