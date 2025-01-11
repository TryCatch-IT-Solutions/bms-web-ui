import { DeleteDeviceType } from '@/api/device/schema'
import { GroupType } from '@/api/group/schema'
import { atom } from 'jotai'

export const createDeviceGroupAtom = atom<GroupType | null>(null)
export const deleteDeviceAtom = atom<DeleteDeviceType | null>(null)
export const groupFilterAtom = atom<number | null>(null)
