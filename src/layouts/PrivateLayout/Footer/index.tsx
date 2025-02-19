import { getAPIKey } from '@/api/settings'
import Spinner from '@/components/Spinner'
import { API_KEY_LABELS } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import daiLogo from '@/assets/dai-logo.png'
import { LOGO_URL } from '@/api/axiosInstance'

export const Footer: React.FC = () => {
    const { data: logo, isLoading } = useQuery({
        queryKey: ['footerLogo'],
        queryFn: () => getAPIKey(API_KEY_LABELS.SECONDARY_LOGO, 0),
    })

    return (
        <div className='flex flex-row gap-5 bg-gray-300 text-white h-5 absolute w-full text-xs pl-5 mt-5 absolute bottom-0'>
            <p className='mt-[3px]'>Powered By:</p>
            {isLoading ? (
                <Spinner variant='normal' className='h-3 w-3' />
            ) : (
                <img src={logo?.value ? LOGO_URL + logo?.value : daiLogo} />
            )}
        </div>
    )
}
