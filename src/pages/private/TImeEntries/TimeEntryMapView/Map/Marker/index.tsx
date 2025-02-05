import { useMemo } from 'react'
import { MarkerF } from '@react-google-maps/api'
import { MarkerProps } from '@react-google-maps/api'
import bmsMarker from '@/assets/common/bms-marker.png'

export type GeocodeResult = {
    lat: number
    lng: number
}

type CustomerMarkerProps = Pick<MarkerProps, 'clusterer'> & {
    activeMarker: number | null
    position: GeocodeResult
    setMarker: (val: null | number) => void
}

const Marker = ({ position }: CustomerMarkerProps) => {
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

    return <MarkerF key={1} position={position} icon={iconProps} label={''}></MarkerF>
}

export default Marker
