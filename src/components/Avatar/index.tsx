'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/utils/helper'
import { UserDataType } from '@/api/auth/schema'
import { BusinessProfileType } from '@/api/business/schema'
import { EmployeeType } from '@/api/employee/schema'

const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
        {...props}
    />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn('aspect-square h-full w-full rounded-full', className)}
        {...props}
    />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
            'flex h-full w-full items-center justify-center rounded-full bg-muted',
            className,
        )}
        {...props}
    />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

interface SelectedImage {
    url?: string
    name?: string
}

interface AvatarImageProps {
    src?: string
    alt?: string
}

export const AvatarComponent: React.FC<{
    user: UserDataType | BusinessProfileType | EmployeeType | null
    selectedImage?: SelectedImage[]
}> = ({ user, selectedImage }) => {
    const getImageSource = (): string | undefined => {
        return (
            selectedImage?.[0]?.url ??
            (typeof user?.profileImage === 'string'
                ? `${user.profileImage}?${user?.updatedAt}`
                : undefined)
        )
    }

    const avatarImageProps: AvatarImageProps = {
        src: getImageSource(),
        alt: selectedImage?.[0]?.name ?? '',
    }

    return <AvatarImage {...avatarImageProps} />
}
