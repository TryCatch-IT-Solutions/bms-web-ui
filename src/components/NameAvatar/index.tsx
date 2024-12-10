interface NameAvatarProps {
    firstName: string
    lastName: string
}

export const NameAvatar: React.FC<NameAvatarProps> = ({ firstName, lastName }) => {
    return (
        <div
            className='h-[26px] w-[26px] rounded-full bg-gray-300 flex justify-center items-center mr-1'
            title={`${firstName} ${lastName}`}
        >
            <span className='text-zentive-black text-base'>
                {`${firstName?.charAt(0)?.toUpperCase() ?? ''}${
                    lastName.charAt(0)?.toUpperCase() ?? ''
                }`}
            </span>
        </div>
    )
}
