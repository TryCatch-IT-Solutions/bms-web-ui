import { AddEmpToGroupType, DeleteGroupType } from '@/api/group/schema'
import { ProfileType } from '@/api/profile/schema'
import { atom } from 'jotai'

export const createGroupAdminProfileAtom = atom<ProfileType | null>(null)
export const createGroupEmployeesProfileAtom = atom<ProfileType[] | null>(null)
export const adminIdAtom = atom<number | null>(null)
export const empIdsAtom = atom<number[] | null>(null)
export const employeeGroupToRemoveAtom = atom<AddEmpToGroupType | null>(null)
export const groupsToDeleteAtom = atom<DeleteGroupType | null>(null)
