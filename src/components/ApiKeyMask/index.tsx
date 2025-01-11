// src/components/ApiKeyMask.tsx

import React from 'react'

interface ApiKeyMaskProps {
    apiKey: string
}

const ApiKeyMask: React.FC<ApiKeyMaskProps> = ({ apiKey }) => {
    const maskApiKey = (key: string) => {
        const visibleLength = 4 // Number of characters to show at the start and end
        const maskedPart = key.slice(visibleLength, -visibleLength).replace(/./g, '*')
        return `${key.slice(0, visibleLength)}${maskedPart}${key.slice(-visibleLength)}`
    }

    return (
        <div className='flex items-center space-x-2'>
            <span className='font-mono text-gray-700'>{maskApiKey(apiKey)}</span>
            <button
                onClick={() => alert(`Full API Key: ${apiKey}`)}
                className='text-blue-500 hover:text-blue-700 focus:outline-none'
            >
                Show Full
            </button>
        </div>
    )
}

export default ApiKeyMask
