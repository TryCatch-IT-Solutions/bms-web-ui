import { BreadCrumbs } from '@/components/BreadCrumbs'
import { GroupTable } from './GroupTable'

export const GroupList: React.FC = () => {
    return (
        <div className='content'>
            <BreadCrumbs title='Group List' origin='Groups' />
            <GroupTable />
        </div>
    )
}
