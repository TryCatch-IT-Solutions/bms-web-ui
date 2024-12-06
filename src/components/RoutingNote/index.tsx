export const RoutingNote = () => {
    return (
        <div className='bg-zentive-green-bg_light w-full text-left text-base px-3 py-2'>
            <p>
                <span className='text-zentive-blue-dark font-bold'>Note:</span> You cannot optimize{' '}
                <b>scheduled jobs</b>. To optimize scheduled jobs, edit the job and change its
                availability status to <b>Anytime</b>{' '}
            </p>
        </div>
    )
}
