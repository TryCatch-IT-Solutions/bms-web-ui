import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Card, CardContent } from '@/components/Card'
import { GroupForm } from './GroupForm'

export const EditGroup = () => {
    return (
        <div className='content'>
            <BreadCrumbs title='Edit Group' origin='Groups' id={1} />
            <Card>
                <CardContent>
                    <GroupForm />
                </CardContent>
            </Card>
        </div>
    )
}
