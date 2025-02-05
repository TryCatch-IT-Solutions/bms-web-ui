import { GoogleMap } from '@react-google-maps/api'
import { useCallback, useEffect, useState } from 'react'
import Marker from './Marker'
import { useLocation } from 'react-router-dom'

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

const Map = () => {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [activeMarker, setMarker] = useState<number | null>(null)
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [previousBounds, setPreviousBounds] = useState<google.maps.LatLngBounds | null>(null)

    const loc = useLocation()
    const searchParam = new URLSearchParams(loc.search)
    const lat = searchParam.get('lat') ? parseFloat(searchParam.get('lat') ?? '') : NaN
    const lon = searchParam.get('lon') ? parseFloat(searchParam.get('lon') ?? '') : NaN

    const handleLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance)
    }, [])

    useEffect(() => {
        setTimeout(() => setIsMounted(true), 0)
    }, [])

    useEffect(() => {
        const bounds = new google.maps.LatLngBounds()

        bounds.extend(new google.maps.LatLng(lat as number, lon as number))

        setPreviousBounds(bounds)
    }, [map, lat, lon])

    useEffect(() => {
        if (!isMounted || !map) return
        const bounds = new google.maps.LatLngBounds()

        bounds.extend(new google.maps.LatLng(lat as number, lon as number))

        if (previousBounds) {
            map.fitBounds(previousBounds)
        } else {
            map.fitBounds(bounds)
            setPreviousBounds(bounds)
        }

        map.setZoom(20)
    }, [isMounted, map, lat, lon])

    return (
        <GoogleMap mapContainerStyle={containerStyle} onLoad={handleLoad} options={mapOptions}>
            {isMounted && (
                <Marker
                    activeMarker={activeMarker}
                    position={{
                        lat: Number(lat),
                        lng: Number(lon),
                    }}
                    setMarker={setMarker}
                />
            )}
        </GoogleMap>
    )
}

export default Map
