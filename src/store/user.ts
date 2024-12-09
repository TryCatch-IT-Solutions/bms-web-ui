import { USER_STATUS } from '@/constants'
import { atom } from 'jotai'

export const userSelectedStatusAtom = atom<string>(USER_STATUS.ACTIVATED)
