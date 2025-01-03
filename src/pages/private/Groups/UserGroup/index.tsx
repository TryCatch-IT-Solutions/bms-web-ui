import { BreadCrumbs } from '@/components/BreadCrumbs'
import { GroupForm } from './GroupForm'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/store/user'

export const UserGroup = () => {
    const user = useAtomValue(userAtom)

    return (
        <div className='content'>
            <BreadCrumbs title='Edit Group' origin='Groups' id={user?.group_id ?? 0} />
            <GroupForm />
        </div>
    )
}
