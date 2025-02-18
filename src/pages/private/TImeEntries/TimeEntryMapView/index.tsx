import { FC, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Map from './Map'
import GoogleMapsApiWrapper from '@/components/GoogleMapsApiWrapper'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { getDeviceMapView } from '@/api/device'
import { DeviceType } from '@/api/device/schema'
import { getAPIKey } from '@/api/settings'
import { API_KEY_LABELS } from '@/constants'
import Spinner from '@/components/Spinner'

type MapViewProps = {
    isLoaded: boolean
    loadError?: Error
}

const MapView: FC<MapViewProps> = ({ isLoaded, loadError }) => {
    const { data, isLoading, isError } = useQuery<DeviceType[]>({
        queryKey: ['deviceMapView'],
        queryFn: getDeviceMapView,
        staleTime: Infinity, // Ensure it doesn't refetch unnecessarily
    })

    const mapContent = useMemo(() => {
        if (isLoading || isError || !isLoaded || loadError) {
            return null
        }

        return (
            <div className='h-full w-full flex flex-col items-center'>
                <div className='mt-4 w-full min-h-[540px] lg:h-[800px] rounded-[8px] border border-zentive-gray-medium flex'>
                    <Map />
                </div>
            </div>
        )
    }, [isLoading, isError, isLoaded, loadError, data])

    return (
        <div className='content'>
            <BreadCrumbs title='Time Entry Map View' origin='Time Entries' />
            {mapContent}
        </div>
    )
}

export const TimeEntryMapView: FC = () => {
    const { data: apiKey, isLoading } = useQuery({
        queryKey: ['googleMapsAPIKey'],
        queryFn: () => getAPIKey(API_KEY_LABELS.MAPS, 0),
        staleTime: Infinity, // Ensure it doesn't refetch unnecessarily
    })

    if (isLoading) {
        return <Spinner variant='normal' />
    } else {
        return (
            <GoogleMapsApiWrapper
                render={(isLoaded: boolean, loadError?: Error) => (
                    <MapView isLoaded={isLoaded} loadError={loadError} />
                )}
                apiKey={apiKey?.value ?? ''}
            />
        )
    }
}
