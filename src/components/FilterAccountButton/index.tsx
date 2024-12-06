import { Checkbox } from '@/components/Checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/DropdownMenu'
import { BsFunnelFill } from 'react-icons/bs'
import { ParamsFilterType } from '@/api/profile/schema'
import { useLocation } from 'react-router-dom'

interface props {
    onClickOptions: (keyword: FilterOptionsKeys, isChecked: boolean) => void
    selectedFilter: ParamsFilterType
}

type FilterOptionsKeys = keyof ParamsFilterType

const FilterAccountButton = ({ onClickOptions, selectedFilter }: props) => {
    const { pathname } = useLocation()

    const filterOptionWithDetails: {
        property: FilterOptionsKeys
        name: string
        isChecked: boolean
    }[] = [
        {
            property: 'newestCustomer',
            name: 'Newest Customer',
            isChecked: selectedFilter?.newestCustomer ?? false,
        },
        {
            property: 'oldestCustomer',
            name: 'Oldest Customer',
            isChecked: selectedFilter?.oldestCustomer ?? false,
        },
        {
            property: 'recentlyCancelled',
            name: 'Recently Cancelled Users',
            isChecked: selectedFilter?.updatedCustomer ?? false,
        },
    ]

    const filteredOptions = filterOptionWithDetails.filter(
        (option) => !(pathname.startsWith('/customers') && option.property === 'recentlyCancelled'),
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <BsFunnelFill className='size-[25px]' />
            </DropdownMenuTrigger>
            {
                <DropdownMenuContent className='absolute right-0 z-10 mt-2 w-[250px] px-4 py-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {filteredOptions?.map((option) => (
                        <div className='flex justify-start space-x-2' key={option.property}>
                            <Checkbox
                                onCheckedChange={(val) =>
                                    onClickOptions(option.property, val as boolean)
                                }
                                checked={option.isChecked}
                                className='mt-1'
                            />
                            <div>{option.name}</div>
                        </div>
                    ))}
                </DropdownMenuContent>
            }
        </DropdownMenu>
    )
}
export default FilterAccountButton
