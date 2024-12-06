import { manageSubsTabAtom } from '@/store/manageSubs'
import { useAtomValue } from 'jotai'
import { Avatar, AvatarComponent, AvatarFallback } from '../Avatar'
import ImageUploader, { IFile } from '../Common/ImageUploader'
import { userAtom } from '@/store/auth'
import { useEffect, useState } from 'react'
import { USER_STATUS } from '@/constants'

const CircleChangeProfile = () => {
    const status = useAtomValue(manageSubsTabAtom)
    const user = useAtomValue(userAtom)
    const [selectedImage, setSelectedImage] = useState<IFile[]>([])
    const firstNameInitial = user?.lastName ? user?.lastName.charAt(0) : ''
    const lastNameInitital = user?.firstName ? user?.firstName.charAt(0) : ''

    useEffect(() => {
        if (selectedImage) {
            // setValue('profileImage', selectedImage[0]?.file)
        }
    }, [selectedImage])

    return (
        <section className='mb-[32px] flex flex-col items-center justify-center text-center gap-[12px] mt-[35px] w-full'>
            <Avatar className='w-[74px] h-[74px]'>
                <AvatarComponent user={user ?? null} selectedImage={selectedImage} />
                <AvatarFallback>{firstNameInitial + lastNameInitital}</AvatarFallback>
            </Avatar>
            {status !== USER_STATUS.DELETED && status !== USER_STATUS.TERMINATED ? (
                <ImageUploader
                    onFilesChange={(data) => setSelectedImage(data)}
                    maxSize={4.9}
                    accept='.png,.jpeg,.jpg'
                    label='Change photo'
                    labelClassname='text-indigo-900 text-decoration-line: underline'
                />
            ) : (
                <></>
            )}
        </section>
    )
}

export default CircleChangeProfile
