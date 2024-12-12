import { USER_STATUS } from '@/constants'
import { userSelectedStatusAtom } from '@/store/user'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useSetAtom } from 'jotai'

export const EmployeeStatusBar: React.FC = () => {
    const setSelected = useSetAtom(userSelectedStatusAtom)

    const onSwitchTab = (status: string) => {
        setSelected(status)
    }

    return (
        <Tabs
            defaultValue={'ACT'}
            onValueChange={(val) => setSelected(val)}
            className='bg-white rounded-md w-full'
        >
            <TabsList className='w-full flex flex-row mt-[26px] space-x-4'>
                <TabsTrigger
                    onClick={() => onSwitchTab(USER_STATUS.ACTIVATED)}
                    value={USER_STATUS.ACTIVATED}
                    className={
                        'w-1/2 h-[54px] text-lg text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                    }
                >
                    {`Active (0)`}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => onSwitchTab(USER_STATUS.DELETED)}
                    value={USER_STATUS.DELETED}
                    className={
                        'w-1/2 h-[54px] text-lg text-bms-gray-dark data-[state=active]:text-bms-link data-[state=active]: border-bms-link data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:bg-white sm:truncate ...'
                    }
                >
                    {`Archived (0)`}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
