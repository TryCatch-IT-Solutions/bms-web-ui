import { useAtomValue } from 'jotai'
import { ProfileForm } from './ProfileForm'
import { userProfileTabsAtom } from '@/store/user'
import { UserProfileTabs } from './UserProfileTabs'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { USER_PROFILE_TABS } from '@/constants'
import { PasswordForm } from './PasswordForm'

export const UserProfile = () => {
    const selected = useAtomValue(userProfileTabsAtom)

    return (
        <div className='content'>
            <BreadCrumbs title='My Profile' origin='Settings' />
            <UserProfileTabs />
            {selected === USER_PROFILE_TABS.PROFILE ? <ProfileForm /> : <PasswordForm />}
        </div>
    )
}
