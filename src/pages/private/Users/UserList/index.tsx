import { BreadCrumbs } from '@/components/BreadCrumbs'

import { UserTable } from './UserTable'

export const UserList: React.FC = () => {
    return (
        <div className='content'>
            <BreadCrumbs title='User List' origin='Users' />
            <UserTable />
        </div>
    )
}
