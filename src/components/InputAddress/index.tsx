import { FullAddress } from '@/hooks/useGeocode'
import GoogleMapsApiWrapper from '../GoogleMapsApiWrapper'
import WrappedInputAddress from './WrappedInputAddress'
import { InputProps } from '../Input'
import { forwardRef } from 'react'

export type InputAddressProps = Omit<InputProps, 'type'> & {
    onPlaceSelected: (options: FullAddress) => void
}

const InputAddress = forwardRef<HTMLInputElement, InputAddressProps>((props, forwardedRef) => {
    return (
        <GoogleMapsApiWrapper
            render={(isLoaded: boolean, loadError?: Error) => {
                if (!isLoaded || loadError) return null

                return <WrappedInputAddress {...props} ref={forwardedRef} />
            }}
        />
    )
})

export default InputAddress
