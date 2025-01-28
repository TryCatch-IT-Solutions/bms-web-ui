interface ExportCounterProps {
    selected: number
    limit: number
}

export const ExportCounter: React.FC<ExportCounterProps> = ({ selected, limit }) => {
    return (
        <div className='flex flex-row items-center justify-end'>
            <p>
                {selected} out of {limit} records selected
            </p>
        </div>
    )
}
