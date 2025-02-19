import {
    BulkUserUpdateStatusType,
    ProfileType,
    TimeEntriesListType,
    UserListType,
} from '@/api/profile/schema'
import { USER_PROFILE_TABS, USER_STATUS } from '@/constants'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const userSelectedStatusAtom = atom<string>(USER_STATUS.ACTIVATED)
export const employeeSelectedStatusAtom = atom<string>(USER_STATUS.ACTIVATED)
export const employeesToDeleteAtom = atom<BulkUserUpdateStatusType | null>(null)
export const userAtom = atomWithStorage<ProfileType | null>('userAtom', null)
export const tokenAtom = atomWithStorage<string | null>('tokenAtom', null)
export const userIdsToDeleteAtom = atom<BulkUserUpdateStatusType | null>(null)
export const employeeExportAtom = atom<UserListType | null>(null)
export const usersToExportAtom = atom<UserListType | null>(null)
export const userRoleFilterAtom = atom<string[] | null>(['superadmin', 'groupadmin'])
export const userAssignStatusFilterAtom = atom<boolean | null>(null)
export const employeeAssignStatusFilterAtom = atom<boolean | null>(null)
export const userProfileTabsAtom = atom<string>(USER_PROFILE_TABS.PROFILE)
export const timeEntriesToExportAtom = atom<TimeEntriesListType | null>(null)
export const userProfileNotificationAtom = atom<ProfileType | null>(null)
export const imageUploadErrorAtom = atom<string | null>(null)

imageUploadErrorAtom.onMount = (setAtom) => {
    return setAtom(null)
}
