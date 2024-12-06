import { Checkbox } from '@/components/Checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/DropdownMenu'
import { BsFunnelFill } from 'react-icons/bs'
import { NEW_SORT, SORT_LABEL } from '@/constants'
import { AccountSortType } from '@/api/profile/schema'
import { Dispatch, SetStateAction } from 'react'

interface SortAccountButtonProps {
    sort: AccountSortType
    setSort: Dispatch<SetStateAction<AccountSortType>>
}

const SortAccountButton: React.FC<SortAccountButtonProps> = ({ sort, setSort }) => {
    const handleCheck = (s: AccountSortType) => {
        setSort(s)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <BsFunnelFill className='size-[25px]' />
            </DropdownMenuTrigger>
            {
                <DropdownMenuContent className='absolute right-0 z-10 mt-2 w-[250px] px-4 py-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {Object.entries(NEW_SORT)?.map(([key, s]) => (
                        <li key={key} className='flex flex-row gap-2 mt-4 text-base'>
                            <Checkbox
                                className='mt-1'
                                onCheckedChange={() => handleCheck(s as AccountSortType)}
                                checked={s === sort}
                            />
                            <p>{SORT_LABEL[s as AccountSortType]}</p>
                        </li>
                    ))}
                </DropdownMenuContent>
            }
        </DropdownMenu>
    )
}
export default SortAccountButton
