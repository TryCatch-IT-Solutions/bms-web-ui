import { BreadCrumbs } from '@/components/BreadCrumbs'
import { USER_PROFILE_TABS } from '@/constants'
import { userProfileTabsAtom } from '@/store/user'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { ProfileForm } from './ProfileForm'
import { PasswordForm } from './PasswordForm'
import { UserProfileTabs } from './UserProfileTabs'

export const EditUser: React.FC = () => {
    const [selected, setSelected] = useAtom(userProfileTabsAtom)

    useEffect(() => {
        setSelected(USER_PROFILE_TABS.PROFILE)
    }, [])

    return (
        <div className='content'>
            <BreadCrumbs title='Edit User' origin='Users' />
            <UserProfileTabs />
            {selected === USER_PROFILE_TABS.PROFILE ? <ProfileForm /> : <PasswordForm />}
        </div>
    )
}
