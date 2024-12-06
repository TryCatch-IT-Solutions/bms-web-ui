import { Session } from '@supabase/gotrue-js'
import { UserDataType } from '@/api/auth/schema'
import { CustomerProfileType, FullProfileType, UserAccountStatusType } from '@/api/profile/schema'
import { getItem } from './storage'
import { EmployeeType } from '@/api/employee/schema'
import { CrewType, UpdateCrewType } from '@/api/crew/schema'
import dayjs from 'dayjs'
import { ISO_8601, ROLE, COMPLETE_FORMAT_WITHOUT_TIME } from '@/constants'
import { CrewtoCrewMemberType } from '@/api/crew/schema'

export const getSession = () => getItem<Session>('supabase.auth.token')

export const extractUserMetaData = (session: Session, user: UserDataType) => ({
    ...session.user.user_metadata, // user_metadata's previous value to retain unaffected properties
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
    ...user.address,
    ...user.business,
})

export const extractUserReponse = (user: FullProfileType) => ({
    profileId: user.profileId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    crewMemberId: user.crewMemberId,
    customerId: user.customerId,
    businessId: user.businessId,
    business: {
        businessId: user.business?.businessId,
        businessName: user.business?.businessName,
        businessWebsite: user.business?.businessWebsite,
        status: user.business?.status,
        contacted: user.business?.contacted,
        subscriptionTypeId: user.business?.subscriptionTypeId,
        subscriptionExpiryDate: user.business?.subscriptionExpiryDate,
        subscriptionStripeId: user.business?.subscriptionStripeId,
        subscriptionType: {
            subscriptionTypeId: user.business?.subscriptionType?.subscriptionTypeId,
            stripeProductId: user.business?.subscriptionType?.stripeProductId,
            stripePriceId: user.business?.subscriptionType?.stripePriceId,
            name: user.business?.subscriptionType?.name,
            price: user.business?.subscriptionType?.price,
            interval: user.business?.subscriptionType?.interval,
        },
        stripeCoupon: user.business?.stripeCoupon,
    },
    addressId: user.addressId,
    address: {
        addressId: user.address.addressId,
        streetAddress: user.address.streetAddress,
        streetTwoAddress: user.address?.streetTwoAddress || '',
        city: user.address.city,
        state: user.address.state,
        zipCode: user.address.zipCode,
        gmapLat: user.address.gmapLat,
        gmapLng: user.address.gmapLng,
    },
    roleId: user.roleId,
    role: {
        roleId: user.role?.roleId,
        roleName: user.role?.roleName,
        roleDescription: user.role?.roleDescription,
    },
    profileImage: user?.profileImage,
    isPasswordGenerated: user?.isPasswordGenerated,
    isStripeSetupLater: user?.isStripeSetupLater,
    stripeConnectedAccId: user?.stripeConnectedAccId,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
})

export const getDefaultFormValues = (user: CustomerProfileType) => ({
    profileId: user?.profileId,
    profileImage: user?.profileImage,
    addressId: user?.addressId,
    accountNumber: user?.accountNumber,
    status: user?.status,
    isPasswordGenerated: !!user?.isPasswordGenerated,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    createdAt: dayjs(user?.createdAt).format(COMPLETE_FORMAT_WITHOUT_TIME),
    address: {
        streetAddress: user?.address?.streetAddress,
        streetTwoAddress:
            user?.address?.streetTwoAddress === 'undefined' ? '' : user?.address?.streetTwoAddress,
        city: user?.address?.city,
        state: user?.address?.state,
        zipCode: user?.address?.zipCode,
    },
})

export const formatLastJobDate = (lastJobDate: string) => ({
    lastJobDate: lastJobDate ? dayjs(lastJobDate).format(COMPLETE_FORMAT_WITHOUT_TIME) : ' - ',
})

export const getEmployeeFormValues = (employee: EmployeeType | undefined): EmployeeType => ({
    employeeNumber: String(employee?.employeeNumber),
    profileId: employee?.profileId as string,
    roleId: employee?.roleId as string,
    businessId: employee?.businessId as string,
    crewMemberId: employee?.crewMemberId as string,
    status: employee?.status as UserAccountStatusType,
    isPasswordGenerated: employee?.isPasswordGenerated || false,
    addressId: employee?.addressId as string,
    address: {
        streetAddress: employee?.address?.streetAddress as string,
        streetTwoAddress: employee?.address?.streetTwoAddress as string,
        city: employee?.address?.city as string,
        state: employee?.address?.state as string,
        zipCode: employee?.address?.zipCode as string,
    },
    firstName: employee?.firstName as string,
    lastName: employee?.lastName as string,
    email: employee?.email as string,
    compensation: employee?.compensation || 0,
    caLicense: employee?.caLicense as string,
    dateOfBirth: employee?.dateOfBirth ? dayjs(employee?.dateOfBirth).format(ISO_8601) : '',
    dateHired: dayjs(employee?.createdAt).format(ISO_8601),
    phoneNumber: employee?.phoneNumber as string,
})

export const getCrewFormValues = (crew: CrewType | undefined): UpdateCrewType => ({
    crewNumber: crew?.crewNumber as number,
    crewColor: crew?.crewColor as string,
    description: crew?.description as string,
    memberProfileIds: crew?.members?.map((member) => member.profileId) as string[],
    crewId: crew?.crewId as string,
    businessId: crew?.businessId as string,
    foreManId: crew?.foreMan.profileId as string,
})

export const extractCrewMemberProfile = (crewMember: CrewtoCrewMemberType) => ({
    profileId: crewMember.profileId,
    businessId: crewMember.crewProfile.businessId,
    addressId: crewMember.crewProfile.addressId,
    roleId: crewMember.crewProfile.roleId,
    customerId: '',
    email: crewMember.crewProfile.email,
    phoneNumber: crewMember.crewProfile.phoneNumber,
    firstName: crewMember.crewProfile.firstName,
    lastName: crewMember.crewProfile.lastName,
    profileImage: crewMember.crewProfile.profileImage,
    crewMemberId: crewMember.crewMemberId,
    compensation: crewMember.crewProfile.compensation,
    caLicense: crewMember.crewProfile.caLicense,
    dateHired: crewMember.createdAt,
    updatedAt: crewMember.updatedAt,
    createdAt: crewMember.createdAt,
    status: crewMember.crewProfile.status,
    role: {
        createdAt: undefined,
        createdBy: undefined,
        updatedAt: undefined,
        updatedBy: undefined,
        deletedAt: undefined,
        roleId: crewMember.crewProfile.roleId,
        roleName: 'CREW',
        roleDescription: '',
    },
    isPasswordGenerated: crewMember.crewProfile?.isPasswordGenerated,
    dateOfBirth: crewMember.crewProfile.dateOfBirth,
    employeeNumber: crewMember.crewProfile.employeeNumber,
    address: {
        streetAddress: crewMember.crewProfile.address.streetAddress,
        streetTwoAddress: crewMember.crewProfile.address.streetTwoAddress,
        city: crewMember.crewProfile.address.city,
        state: crewMember.crewProfile.address.state,
        zipCode: crewMember.crewProfile.address.zipCode,
    },
})

export const isCorrectRole = (roleName: string, role: string) => roleName === role

export const isOwnerOrCustomer = (roleName: string) =>
    isCorrectRole(roleName, ROLE.OWNER) ||
    isCorrectRole(roleName, ROLE.CUSTOMER) ||
    isCorrectRole(roleName, ROLE.CO_OWNER)

export const isCrew = (roleName: string) => isCorrectRole(roleName, ROLE.CREW)
