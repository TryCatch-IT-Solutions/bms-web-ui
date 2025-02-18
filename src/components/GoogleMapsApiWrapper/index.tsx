import { useJsApiLoader, Libraries } from '@react-google-maps/api'
import { FC } from 'react'

type GoogleMapsApiWrapperProps = {
    apiKey: string
    render: (isLoaded: boolean, loadError?: Error) => React.ReactNode
}

const libraries: Libraries = ['maps', 'places']

const GoogleMapsApiWrapper: FC<GoogleMapsApiWrapperProps> = ({ render, apiKey }) => {
    const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: apiKey, libraries })

    try {
        return <>{render(isLoaded, loadError)}</>
    } catch {
        return <></>
    }
}

export default GoogleMapsApiWrapper
