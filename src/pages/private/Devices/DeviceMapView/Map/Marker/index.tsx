import { useMemo } from 'react'
import { MarkerF, InfoWindowF } from '@react-google-maps/api'
import { MarkerProps } from '@react-google-maps/api'
import { DeviceType } from '@/api/device/schema'
import bmsMarker from '@/assets/common/bms-marker.png'

export type GeocodeResult = {
    lat: number
    lng: number
}

type CustomerMarkerProps = Pick<MarkerProps, 'clusterer'> & {
    activeMarker: number | null
    coordinate: DeviceType
    position: GeocodeResult
    text: string
    setMarker: (val: null | number) => void
}

const Marker = ({
    activeMarker,
    clusterer,
    coordinate,
    position,
    text,
    setMarker,
}: CustomerMarkerProps) => {
    const iconProps = useMemo(
        () => ({
            anchor: new window.google.maps.Point(17, 46),
            scaledSize: new window.google.maps.Size(31, 45),
            labelOrigin: new google.maps.Point(15.5, 15.5),
            url: bmsMarker,
            zIndex: 50,
        }),
        [],
    )

    const markerLabel = useMemo(
        () => ({
            text: text,
            color: '#3b671a',
            fontSize: '14px',
        }),
        [text],
    )

    const { id, model, serial_no } = coordinate

    return (
        <MarkerF
            key={id}
            position={position}
            icon={iconProps}
            label={markerLabel}
            clusterer={clusterer}
            onClick={() => setMarker(id)}
        >
            {activeMarker === id ? (
                <InfoWindowF options={{ minWidth: 280 }} onCloseClick={() => setMarker(null)}>
                    <div className='p-2 space-y-2'>
                        <div className='text-zentive-green-dark text-sm flex flex-row items-center gap-2'>
                            <b className='font-semibold'>Device: </b>
                            {id}
                        </div>
                        <div className='text-zentive-green-dark text-sm flex flex-row items-center gap-2'>
                            <b className='font-semibold'>Model: </b>
                            {model}
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <p className='text-sm'>
                                <b className='font-semibold'>Serial No: </b>
                                {serial_no}
                            </p>
                        </div>
                    </div>
                </InfoWindowF>
            ) : null}
        </MarkerF>
    )
}

export default Marker
