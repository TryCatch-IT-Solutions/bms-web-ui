export const SyncNotificationBar = () => {
    return (
        <div className='flex flex-row border border-1 items-center justify-center px-5 py-2 xs:text-sm'>
            <p className='text-bms-gray-500'>
                <b>NOTE:</b> The syncing of records from the device to the website may take up to 5
                minutes to reflect.
            </p>
        </div>
    )
}
