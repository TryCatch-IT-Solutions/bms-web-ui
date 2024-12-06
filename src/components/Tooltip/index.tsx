import React from 'react'

interface TooltipProps {
    position: 'top' | 'bottom' | 'left' | 'right'
    content?: React.ReactNode
    children: React.ReactNode
    alignment?: 'start' | 'end'
    fontstyle?: string
    height?: string
    width?: string
}

const Tooltip = ({
    position,
    content,
    children,
    alignment,
    fontstyle,
    width,
    height,
}: TooltipProps) => {
    const contentClass = `absolute z-10 hidden group-hover:inline-block bg-zentive-black text-zentive-gray-bg text-xs ${fontstyle} px-3 py-2 rounded-sm h-${height} w-${width}
        ${
            position === 'top' && !alignment
                ? 'left-1/2 transform -translate-x-1/2 bottom-full mb-2'
                : ''
        }
        ${
            position === 'bottom' && !alignment
                ? 'left-1/2 transform -translate-x-1/2 top-full mt-2'
                : ''
        }
        ${
            position === 'left' && !alignment
                ? 'top-1/2 transform -translate-y-1/2 right-full mr-2'
                : ''
        }
        ${
            position === 'right' && !alignment
                ? 'top-1/2 transform -translate-y-1/2 left-full ml-2'
                : ''
        }
        
        ${
            position === 'top' && alignment === 'start'
                ? 'left-0 transform -translate-x-3 bottom-full mb-2'
                : ''
        }
        ${
            position === 'top' && alignment === 'end'
                ? 'right-0 transform translate-x-3 bottom-full mb-2'
                : ''
        }
        ${
            position === 'bottom' && alignment === 'start'
                ? 'left-0 transform -translate-x-3 top-full mt-1'
                : ''
        }
        ${
            position === 'bottom' && alignment === 'end'
                ? 'right-0 transform translate-x-3 top-full mt-2'
                : ''
        }
        ${
            position === 'left' && alignment === 'start'
                ? 'top-0 transform -translate-y-3 right-full mr-2'
                : ''
        }
        ${
            position === 'left' && alignment === 'end'
                ? 'bottom-0 transform translate-y-3 right-full mr-2'
                : ''
        }
        ${
            position === 'right' && alignment === 'start'
                ? 'top-0 transform -translate-y-3 left-full ml-2'
                : ''
        }
        ${
            position === 'right' && alignment === 'end'
                ? 'bottom-0 transform translate-y-3 left-full ml-2'
                : ''
        }`

    const tailClass = `absolute hidden group-hover:inline-block border-8
        ${
            position === 'top'
                ? 'left-1/2 transform -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-t-zentive-black'
                : ''
        }
        ${
            position === 'bottom'
                ? 'left-1/2 transform -translate-x-1/2 top-full border-l-transparent border-r-transparent border-t-0 border-b-zentive-black'
                : ''
        }
        ${
            position === 'left'
                ? 'top-1/2 transform -translate-y-1/2 right-3 border-t-transparent border-r-transparent border-b-transparent border-l-zentive-black'
                : ''
        }
        ${
            position === 'right'
                ? 'top-1/2 transform -translate-y-1/2 left-3 border-t-transparent border-r-zentive-black border-b-transparent border-l-transparent'
                : ''
        }`

    return (
        <div className='inline-block relative group'>
            {children}
            <span className={tailClass}></span>
            <span className={contentClass}>{content}</span>
        </div>
    )
}

export default Tooltip
