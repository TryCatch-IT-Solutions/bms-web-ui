import { GeneralNotificationTable } from './GeneralNotificationTable'
import { UserNotificationTable } from './UserNotificationTable'

export const NotificationList: React.FC = () => {
    return (
        <div className='flex flex-col gap-5'>
            <UserNotificationTable />
            <GeneralNotificationTable />
        </div>
    )
}
