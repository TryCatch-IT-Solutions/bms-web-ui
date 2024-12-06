import Tooltip from '@/components/Tooltip'
import { FC } from 'react'
import React from 'react'

type FieldSubscriptionRestrictedProps = {
    children: React.ReactElement
    isFieldRestricted: boolean
}

const FIELDRESTRICTED_TEXT: string = 'Action is Restricted'
const FieldSubscriptionRestricted: FC<FieldSubscriptionRestrictedProps> = ({
    children,
    isFieldRestricted,
}) => {
    const childrenClassContent: string = 'cursor-not-allowed text-zentive-gray-medium'
    if (isFieldRestricted) {
        return (
            <Tooltip
                position='bottom'
                content={FIELDRESTRICTED_TEXT}
                alignment='start'
                fontstyle='text-center'
                width='32'
            >
                {React.cloneElement(children, {
                    className: `${children.props.className || ''} ${childrenClassContent}`,
                    disabled: isFieldRestricted,
                })}
            </Tooltip>
        )
    } else {
        return <>{children}</>
    }
}

export default FieldSubscriptionRestricted
