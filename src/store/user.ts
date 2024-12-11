import { ProfileType } from '@/api/profile/schema'
import { USER_STATUS } from '@/constants'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const userSelectedStatusAtom = atom<string>(USER_STATUS.ACTIVATED)

export const userAtom = atomWithStorage<ProfileType | null>('userAtom', null)

export const tokenAtom = atomWithStorage<string | null>('tokenAtom', null)
