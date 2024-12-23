import { GroupType } from '@/api/group/schema'
import { atom } from 'jotai'

export const createDeviceGroupAtom = atom<GroupType | null>(null)
