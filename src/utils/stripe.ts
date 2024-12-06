export type StripeErrorTypes = 'cardNum' | 'cvc' | 'exp'

type StripeError = {
    message: string
    type: StripeErrorTypes
}

const getDeclineMessage = (declineCode: string): StripeErrorTypes => {
    switch (declineCode) {
        case 'generic_decline':
        case 'insufficient_funds':
        case 'lost_card':
        case 'stolen_card':
        case 'card_velocity_exceeded':
        default:
            return 'cardNum'
    }
}

const getErrorMessage = (errorCode: string | undefined): StripeErrorTypes => {
    switch (errorCode) {
        case 'expired_card':
            return 'exp'
        case 'incorrect_cvc':
            return 'cvc'
        case 'processing_error':
        case 'incorrect_number':
        default:
            return 'cardNum'
    }
}

export const getStripeErrorMessage = (
    declineCode: string | undefined,
    errorCode: string | undefined,
    message: string = 'An error occured.',
): StripeError => {
    const type = declineCode ? getDeclineMessage(declineCode) : getErrorMessage(errorCode)

    return {
        type,
        message,
    }
}
