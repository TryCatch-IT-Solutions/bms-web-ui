import { Card, CardContent } from '@/components/Card'

export const NoGroup: React.FC = () => {
    return (
        <Card>
            <CardContent>
                <div className='flex flex-col gap-5 items-center justufy-center my-[3%]'>
                    <img src='/src/assets/empty/empty-1.svg' className='w-[15rem]' alt='No group' />
                    <p className='font-bold text-gray-500 text-xl'>
                        Currently, you have not been assigned to any group.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
