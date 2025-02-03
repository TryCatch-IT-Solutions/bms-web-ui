import { BreadCrumbs } from '@/components/BreadCrumbs'
import { USER_PROFILE_TABS } from '@/constants'
import { userProfileTabsAtom } from '@/store/user'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { ProfileForm } from './ProfileForm'
import { PasswordForm } from './PasswordForm'
import { UserProfileTabs } from './UserProfileTabs'
import { useParams } from 'react-router-dom'

export const EditEmployee: React.FC = () => {
    const [selected, setSelected] = useAtom(userProfileTabsAtom)

    const { id } = useParams()

    const numericId = Number(id)

    useEffect(() => {
        setSelected(USER_PROFILE_TABS.PROFILE)
    }, [])

    return (
        <div className='content'>
            <BreadCrumbs title='Edit Employee' origin='Employees' id={numericId} />
            <UserProfileTabs />
            {selected === USER_PROFILE_TABS.PROFILE ? <ProfileForm /> : <PasswordForm />}
        </div>
    )
}
