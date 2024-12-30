import { useJsApiLoader, Libraries } from '@react-google-maps/api'
import { FC } from 'react'

type GoogleMapsApiWrapperProps = {
    render: (isLoaded: boolean, loadError?: Error) => React.ReactNode
}

const googleMapsApiKey = import.meta.env.PROD
    ? import.meta.env.VITE_GOOGLE_MAPS_PROD_API_KEY
    : import.meta.env.VITE_GOOGLE_MAPS_DEV_API_KEY

const libraries: Libraries = ['maps', 'places']

const GoogleMapsApiWrapper: FC<GoogleMapsApiWrapperProps> = ({ render }) => {
    const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey, libraries })

    return <>{render(isLoaded, loadError)}</>
}

export default GoogleMapsApiWrapper
