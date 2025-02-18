import { LOGO_URL } from '@/api/axiosInstance'
import { getAPIKey } from '@/api/settings'
import Spinner from '@/components/Spinner'
import { API_KEY_LABELS } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import daiLogo from '@/assets/dai-logo.png'

export const Footer: React.FC = () => {
    const { data: logo, isLoading } = useQuery({
        queryKey: ['topBarLogo'],
        queryFn: () => getAPIKey(API_KEY_LABELS.SECONDARY_LOGO, 0),
    })

    return (
        <div className='flex flex-row gap-5 bg-gray-300 text-white h-5 absolute w-full text-xs pl-5 mt-5 absolute bottom-0'>
            <p className='mt-[3px]'>Powered By:</p>
            {isLoading ? (
                <Spinner variant='normal' className='h-3 w-3' />
            ) : (
                <img src={logo?.value ? logo?.value : daiLogo} />
            )}
        </div>
    )
}
