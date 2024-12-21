import { BreadCrumbs } from '@/components/BreadCrumbs'
import { GroupForm } from './GroupForm'

export const EditGroup = () => {
    return (
        <div className='content'>
            <BreadCrumbs title='Edit Group' origin='Groups' id={1} />
            <GroupForm />
        </div>
    )
}
