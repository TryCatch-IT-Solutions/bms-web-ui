import { NavLink } from 'react-router-dom'

export const DowngradeNotification = () => {
    return (
        <div className='text-base bg-zentive-bg-200 rounded-sm px-[15px] mt-[24px] py-4'>
            <span className='font-semibold text-zentive-blue-dark'>Note: </span>
            Your subscription level has changed. Certain features are now restricted or unavailable.
            Please&nbsp;
            <NavLink
                className='font-semibold text-zentive-blue-dark cursor-pointer'
                to={`/owner-subscription/change-plan`}
            >
                <u>upgrade</u>
            </NavLink>
            &nbsp;to regain full access.
        </div>
    )
}
