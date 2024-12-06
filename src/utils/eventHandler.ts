import { hasMoreThanTwoDecimalPlaces } from './helper'

export const handleNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>): number => {
    let value = parseFloat(event.target.value)

    if (isNaN(value)) {
        return 0
    }

    if (hasMoreThanTwoDecimalPlaces(value)) {
        const decimalIndex = event.target.value.indexOf('.')
        value = parseFloat(event.target.value.substring(0, decimalIndex + 3))
    }

    return value
}
