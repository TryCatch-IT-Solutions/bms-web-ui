import { GoogleMap, MarkerClustererF } from '@react-google-maps/api'
import { useCallback, useEffect, useState } from 'react'
import Marker from './Marker'
import { DeviceType } from '@/api/device/schema'

type MapProps = {
    coordinates: DeviceType[]
}

const containerStyle = {
    borderRadius: '8px',
    flex: 1,
}

const mapOptions = {
    keyboardShortcuts: false,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
    styles: [
        {
            featureType: 'poi',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
    ],
}

const Map = ({ coordinates }: MapProps) => {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [activeMarker, setMarker] = useState<number | null>(null)
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [previousBounds, setPreviousBounds] = useState<google.maps.LatLngBounds | null>(null)

    const handleLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance)
    }, [])

    useEffect(() => {
        setTimeout(() => setIsMounted(true), 0)
    }, [])

    useEffect(() => {
        if (coordinates?.length > 0 && map) {
            const bounds = new google.maps.LatLngBounds()

            coordinates.forEach((coord: DeviceType) => {
                bounds.extend(new google.maps.LatLng(coord?.lat as number, coord?.lon as number))
            })

            setPreviousBounds(bounds)
        }
    }, [coordinates, map])

    useEffect(() => {
        if (!isMounted || !map || !coordinates) return
        const bounds = new google.maps.LatLngBounds()

        coordinates.forEach((coord: DeviceType) => {
            bounds.extend(new google.maps.LatLng(coord?.lat as number, coord?.lon as number))
        })

        if (!coordinates?.length && previousBounds) {
            map.fitBounds(previousBounds)
        } else {
            map.fitBounds(bounds)
            setPreviousBounds(bounds)
        }

        if (coordinates?.length === 1) {
            map.setZoom(10)
        }
    }, [coordinates, isMounted, map])

    return (
        <GoogleMap mapContainerStyle={containerStyle} onLoad={handleLoad} options={mapOptions}>
            {isMounted && (
                <MarkerClustererF minimumClusterSize={2}>
                    {(clusterer) => {
                        return (
                            <>
                                {coordinates?.map((coord) => {
                                    return (
                                        <Marker
                                            activeMarker={activeMarker}
                                            clusterer={clusterer}
                                            coordinate={coord}
                                            key={coord.id}
                                            position={{
                                                lat: Number(coord.lat),
                                                lng: Number(coord.lon),
                                            }}
                                            setMarker={setMarker}
                                            text={`D-${coord.id}`}
                                        />
                                    )
                                })}
                            </>
                        )
                    }}
                </MarkerClustererF>
            )}
        </GoogleMap>
    )
}

export default Map
