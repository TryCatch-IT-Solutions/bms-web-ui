interface NameAvatarProps {
    first_name: string
    last_name: string
}

export const NameAvatar: React.FC<NameAvatarProps> = ({ first_name, last_name }) => {
    return (
        <div
            className='h-[26px] w-[26px] rounded-full bg-gray-300 flex justify-center items-center mr-1'
            title={`${first_name} ${last_name}`}
        >
            <span className='text-zentive-black text-base'>
                {`${first_name?.charAt(0)?.toUpperCase() ?? ''}${
                    last_name.charAt(0)?.toUpperCase() ?? ''
                }`}
            </span>
        </div>
    )
}
