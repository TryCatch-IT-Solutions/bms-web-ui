import { FC, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Map from './Map'
import GoogleMapsApiWrapper from '@/components/GoogleMapsApiWrapper'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { getDeviceMapView } from '@/api/device'
import { DeviceType } from '@/api/device/schema'

type MapViewProps = {
    isLoaded: boolean
    loadError?: Error
}

const MapView: FC<MapViewProps> = ({ isLoaded, loadError }) => {
    const { data, isLoading, isError } = useQuery<DeviceType[]>({
        queryKey: ['deviceMapView'],
        queryFn: getDeviceMapView,
    })

    const mapContent = useMemo(() => {
        if (isLoading || isError || !isLoaded || loadError) {
            return null
        }

        return (
            <div className='h-full w-full flex flex-col items-center'>
                <div className='mt-4 w-full min-h-[540px] lg:h-[800px] rounded-[8px] border border-zentive-gray-medium flex'>
                    <Map coordinates={data as DeviceType[]} />
                </div>
            </div>
        )
    }, [isLoading, isError, isLoaded, loadError, data])

    return (
        <div className='content'>
            <BreadCrumbs title='Map View' origin='Devices' />
            {mapContent}
        </div>
    )
}

const DeviceMapView: FC = () => (
    <GoogleMapsApiWrapper
        render={(isLoaded: boolean, loadError?: Error) => (
            <MapView isLoaded={isLoaded} loadError={loadError} />
        )}
    />
)

export default DeviceMapView
