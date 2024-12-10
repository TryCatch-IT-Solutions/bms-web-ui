import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Card, CardContent } from '@/components/Card'
import { GroupForm } from './GroupForm'

export const CreateGroup = () => {
    return (
        <div className='content'>
            <BreadCrumbs title='Create Group' origin='Groups' />
            <Card>
                <CardContent>
                    <GroupForm />
                </CardContent>
            </Card>
        </div>
    )
}
