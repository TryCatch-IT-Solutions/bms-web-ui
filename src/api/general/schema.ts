import { z } from 'zod'

export const devicesSchema = z.object({
    total: z.number(),
    online: z.number(),
    offline: z.number(),
})

export const employeesSchema = z.object({
    total: z.number(),
    assigned: z.number(),
    unassigned: z.number(),
})

export const groupAdminSchema = z.object({
    total: z.number(),
    assigned: z.number(),
    unassigned: z.number(),
})

export const groupsSchema = z.object({
    total: z.number(),
})

export const announcementsSchema = z.object({
    general: z.number(),
    specific: z.number(),
})

export const statusSchema = z.object({
    devices: devicesSchema,
    employees: employeesSchema,
    group_admin: groupAdminSchema,
    groups: groupsSchema,
    announcements: announcementsSchema,
})

export type DashDevicesType = z.infer<typeof devicesSchema>
export type DashEmployeesType = z.infer<typeof employeesSchema>
export type DashGroupAdminType = z.infer<typeof groupAdminSchema>
export type DashGroupsType = z.infer<typeof groupsSchema>
export type DashAnnouncementsType = z.infer<typeof announcementsSchema>
export type DashboardStatusType = z.infer<typeof statusSchema>
