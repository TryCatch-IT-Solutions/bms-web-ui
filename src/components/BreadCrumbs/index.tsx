import { customerMessageAtom } from '@/store/customer'
import { currentSubsInfoAtom } from '@/store/manageSubs'
import { isFreeTrialEndedAtom } from '@/store/owner'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'
import { GrFormNext } from 'react-icons/gr'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { twJoin, twMerge } from 'tailwind-merge'
interface IAppBreadCrumbProps {
    containerClassName?: string
    buttonClassName?: string
    updateName?: string
    titleName?: string
    label?: string
    pathId?: string
}

const BreadCrumbs: React.FunctionComponent<IAppBreadCrumbProps> = (props) => {
    const { pathname } = useLocation()
    const { id } = useParams()
    const paths: string[] = pathname.split('/') ?? []
    const breadCrumbRef = useRef<HTMLButtonElement | null>(null)
    const headerRef = useRef<HTMLHeadingElement>(null)
    const navigate = useNavigate()
    const currentSubsInfo = useAtomValue(currentSubsInfoAtom)
    const message = useAtomValue(customerMessageAtom)
    const getBusinessName = currentSubsInfo?.business?.businessName
    const messageId = message?.messageId
    const messageTitle = message?.title
    const isFreeTrialEnded = useAtomValue(isFreeTrialEndedAtom)

    //@Please add your  routes with their coresponding url and labels
    const navigates = [
        {
            name: 'jobs',
            url: '/schedule/jobs',
            label: 'Jobs',
            ariaLabel: 'Jobs breadcrumbs',
        },
        {
            name: 'new-job',
            url: '/schedule/jobs/new-job',
            label: 'New Job',
            ariaLabel: 'New Job breadcrumbs',
        },
        {
            name: props.pathId,
            url: '#',
            label: props.label,
            ariaLabel: 'Job View breadcrumbs',
        },
        {
            name: 'job-log',
            url: '/schedule/job-log',
            label: 'Job Log',
            ariaLabel: 'Job Log breadcrumbs',
        },
        {
            name: props.pathId,
            url: '#',
            label: props.label,
            ariaLabel: 'Job Log View breadcrumbs',
        },
        {
            name: 'web',
            url: '/web',
            label: 'Website',
            ariaLabel: 'Website breadcrumbs',
        },
        {
            name: 'schedule',
            url: '#',
            label: 'Schedule',
            ariaLabel: 'Schedule breadcrumbs',
        },
        {
            name: 'crew',
            url: '/schedule/crew',
            label: 'Crew',
            ariaLabel: 'Crew breadcrumbs',
        },
        {
            name: 'add-crew',
            url: '/schedule/crew/add-crew',
            label: 'Add Crew',
            ariaLabel: 'Add-Crew breadcrumbs',
        },
        {
            name: props.pathId,
            url: '#',
            label: props.label,
            ariaLabel: 'View Crew breadcrumbs',
        },
        {
            name: 'employee',
            url: '/schedule/employee',
            label: 'Employees',
            ariaLabel: 'Employee breadcrumbs',
        },
        {
            name: 'add',
            url: '/schedule/employee/add',
            label: 'Add Employee',
            ariaLabel: 'Add-Employee breadcrumbs',
        },
        {
            name: 'manage-subs',
            url: '#',
            label: 'Manage Subscription',
            ariaLabel: 'Manage Subscription breadcrumbs',
        },
        {
            name: 'subscribers',
            url: '/manage-subs/subscribers',
            label: 'Subscribers',
            ariaLabel: 'Subscribers breadcrumbs',
        },
        {
            name: 'details',
            url: '#',
            label: getBusinessName,
            ariaLabel: 'Details breadcrumbs',
        },
        {
            name: 'trash',
            url: '/manage-subs/trash',
            label: 'Deleted Subscribers',
            ariaLabel: 'Deleted Subscribers breadcrumbs',
        },
        {
            name: 'financial-management',
            url: '#',
            label: 'Financial Management',
            ariaLabel: 'Financial Management breadcrumbs',
        },
        {
            name: 'quoting',
            url: '/financial-management/quoting',
            label: 'Quoting',
            ariaLabel: 'Quoting breadcrumbs',
        },
        {
            name: 'add-quoting',
            url: '/financial-management/quoting/add-quoting',
            label: 'Add Quote',
            ariaLabel: 'Add Quoting breadcrumbs',
        },
        {
            name: 'view',
            url: '#',
            label: props.label,
            ariaLabel: 'View Quote breadcrumbs',
        },
        {
            name: 'invoicing',
            url: '/financial-management/invoicing',
            label: 'Invoicing',
            ariaLabel: 'Invoicing breadcrumbs',
        },
        {
            name: 'view',
            url: '#',
            label: props.label,
            ariaLabel: 'View Invoice breadcrumbs',
        },
        {
            name: 'add',
            url: '#',
            label: props.label,
            ariaLabel: 'Add Invoice from job breadcrumbs',
        },
        {
            name: 'customers',
            url: '#',
            label: 'Customers',
            ariaLabel: 'Customers breadcrumbs',
        },
        {
            name: 'create-customer',
            url: '/customers/create-customer',
            label: 'Add Customer',
            ariaLabel: 'Create Customer breadcrumbs',
        },
        {
            name: 'customer-list',
            url: '/customers/customer-list',
            label: 'Customer List',
            ariaLabel: 'Customer List breadcrumbs',
        },
        {
            name: props.pathId,
            url: '/customers/customer-list/' + props.pathId,
            label: props.label,
            ariaLabel: 'Map View breadcrumbs',
        },
        {
            name: 'map-view',
            url: '/customers/customer-list/map-view',
            label: 'Map View',
            ariaLabel: 'Map View breadcrumbs',
        },
        {
            name: 'customer-messaging',
            url: '/customers/customer-messaging',
            label: 'Customer Messaging',
            ariaLabel: 'Customer Messaging breadcrumbs',
        },
        {
            name: 'lead-management',
            url: '/customers/lead-management',
            label: 'Lead Management (CRM)',
            ariaLabel: 'Lead Management (CRM) breadcrumbs',
        },
        {
            name: 'create-message',
            url: '/customers/lead-management/create-message',
            label: 'Create Message',
            ariaLabel: 'Lead Management (CRM) breadcrumbs',
        },
        {
            name: 'create',
            url: '/customers/lead-management/create-message',
            label: 'Create Message',
            ariaLabel: 'Lead Management (CRM) breadcrumbs',
        },
        {
            name: 'create',
            url: '/settings/discounts/create-discount',
            label: 'Create Discount',
            ariaLabel: 'Create Discount',
        },
        {
            name: messageId,
            url: '/customers/customer-messaging/' + messageId,
            label: messageTitle,
            ariaLabel: 'Customer Messaging breadcrumbs',
        },
        {
            name: 'dashboard',
            url: '/dashboard',
            label: 'Dashboard',
            ariaLabel: 'Dashboard breadcrumbs',
        },
        {
            name: 'owner-subscription',
            url: '/settings/owner-subscription',
            label: 'My Subscription',
            ariaLabel: 'My Subscription breadcrumbs',
        },
        {
            name: 'change-plan',
            url: '/owner-subscription/change-plan',
            label: 'Change Plan',
            ariaLabel: 'Change Plan breadcrumbs',
        },
        {
            name: 'upgrade',
            url: '#',
            label: 'Review Changes',
            ariaLabel: 'Review Changes breadcrumbs',
        },
        {
            name: 'downgrade',
            url: '#',
            label: 'Review Changes',
            ariaLabel: 'Review Changes breadcrumbs',
        },
        {
            name: 'confirm',
            url: '#',
            label: 'Review Changes',
            ariaLabel: 'Review Changes breadcrumbs',
        },
        {
            name: 'update-profile',
            url: '/owner-subscription/update-profile',
            label: 'Update Billing Information',
            ariaLabel: 'Update Profile breadcrumbs',
        },
        {
            name: 'change-card',
            url: '/owner-subscription/change-card',
            label: 'Update Payment Details',
            ariaLabel: 'Update Payment Details breadcrumbs',
        },
        {
            name: 'profile',
            url: '/profile',
            label: 'My Account',
            ariaLabel: 'Profile breadcrumbs',
        },
        {
            name: 'customer-portal',
            url: '#',
            label: 'Customer Portal',
            ariaLabel: 'Customer Portal breadcrumbs',
        },
        {
            name: 'payments',
            url: '/customer-portal/payments',
            label: 'Payments',
            ariaLabel: 'Payments breadcrumbs',
        },
        {
            name: 'billing-info',
            url: '/customer-portal/payments/billing-info',
            label: 'Billing Information',
            ariaLabel: 'Billing Info breadcrumbs',
        },
        {
            name: 'customer-change-card',
            url: '/customer-portal/payments/customer-change-card',
            label: 'Update Payment Information',
            ariaLabel: 'Update Payment Information breadcrumbs',
        },
        {
            name: 'quotes',
            url: '/customer-portal/quotes',
            label: 'Quotes',
            ariaLabel: 'Quotes breadcrumbs',
        },
        {
            name: 'invoices',
            url: '/customer-portal/invoices',
            label: 'Invoices',
            ariaLabel: 'Invoices breadcrumbs',
        },
        {
            name: 'history',
            url: '/customer-portal/history',
            label: 'History',
            ariaLabel: 'History breadcrumbs',
        },
        {
            name: 'service-notes',
            url: '/customer-portal/service-notes',
            label: 'Service Notes',
            ariaLabel: 'Service Notes breadcrumbs',
        },
        {
            name: 'request-service',
            url: '/customer-portal/request-service',
            label: 'Request Service',
            ariaLabel: 'Request Service breadcrumbs',
        },
        {
            name: props.pathId,
            url: '/schedule/employee/update/' + props.pathId,
            label: props.label,
            ariaLabel: 'Service Notes breadcrumbs',
        },
        {
            name: 'product-services',
            url: '/settings/product-services',
            label: 'Product & Services',
            ariaLabel: 'Product & Service breadcrumbs',
        },
        {
            name: 'product-service-add-item',
            url: '#',
            label: 'Add Items',
            ariaLabel: 'Product Service Add Item breadcrumbs',
        },
        {
            name: 'manual-payment',
            url: '#',
            label: 'Pay Now',
            ariaLabel: 'Pay Now breadcrumbs',
        },
        {
            name: 'routing',
            url: '/schedule/routing',
            label: 'Routing',
            ariaLabel: 'Routing breadcrumbs',
        },
        {
            name: 'route-optimization',
            url: '/schedule/routing/route-optimization',
            label: 'Route Optimization',
            ariaLabel: 'Route Optimization breadcrumbs',
        },
        {
            name: 'routing',
            url: '/schedule/routing',
            label: 'Routing',
            ariaLabel: 'Routing breadcrumbs',
        },
        {
            name: 'gross-net-income',
            url: '/reports/gross-net-income',
            label: 'Gross and Net Income',
            ariaLabel: 'Gross and Net breadcrumbs',
        },
        {
            name: 'job-completion-reports',
            url: '/reports/job-completion-reports',
            label: 'Job Completion',
            ariaLabel: 'Job Completion breadcrumbs',
        },
        {
            name: 'jobs-completed-employee-reports',
            url: '/reports/jobs-completed-employee-reports',
            label: 'Jobs Completed By Employees',
            ariaLabel: 'Jobs Completed By Employees breadcrumbs',
        },
        {
            name: 'invoice-reports',
            url: '/reports/invoice-reports',
            label: 'Invoice',
            ariaLabel: 'Invoice breadcrumbs',
        },
        {
            name: 'expense-reports',
            url: '/reports/expense-reports',
            label: 'Expense',
            ariaLabel: 'Expense breadcrumbs',
        },
        {
            name: 'quote-reports',
            url: '/reports/quote-reports',
            label: 'Qoutes',
            ariaLabel: 'Qoute breadcrumbs',
        },
        {
            name: 'co-owner',
            url: '/settings/co-owner',
            label: 'Add User',
            ariaLabel: 'Add User',
        },
        {
            name: 'add-co-owner',
            url: '/settings/add-co-owner',
            label: 'Add User',
            ariaLabel: 'Add User',
        },
    ]

    //@TODO: Please add your route when updating
    const updateNames = ['edit', 'update']

    const currentBreadcrumbClass = 'text-zentive-gray-medium cursor-default'
    const nonClickableBreadcrumbClass = 'text-zentive-gray-medium cursor-default'
    const clickableBreadcrumbClass = 'text-zentive-blue-dark'

    const handleClick = (path: string) => {
        const target = navigates.find((item) => item.name === path)
        target && target.url !== '#' && navigate(target.url)
    }

    const getButtonClassName = (url: string) => {
        return url === '#' ? nonClickableBreadcrumbClass : clickableBreadcrumbClass
    }

    const handleChangeName = (key: string) => {
        return navigates.find((item) => item.name === key)?.label ?? key
    }

    if (paths?.length === 1)
        return (
            <div className={twMerge('inline-flex gap-2', props?.containerClassName)}>
                <h1
                    className='w-fit text-[21px] text-primary font-medium capitalize'
                    ref={headerRef}
                    tabIndex={0}
                >
                    {paths[1]}
                </h1>
            </div>
        )
    return (
        <div className='flex flex-col'>
            <div>
                <h1
                    className={`font-semibold mb-2 text-2xl 
                ${
                    props.titleName === 'Job Log' || pathname.startsWith('/schedule/job-log')
                        ? 'text-white'
                        : 'text-zentive-gray-medium'
                }`}
                >
                    {props.titleName}
                </h1>
            </div>
            <div
                className={twMerge(
                    isFreeTrialEnded ? 'hidden' : 'inline-flex gap-2',
                    props?.containerClassName,
                )}
            >
                {paths
                    .filter(
                        (item) => item !== '' && !updateNames.includes(item) && item !== 'settings',
                    )
                    ?.map((item, index, arr) => {
                        const isLastItem = index === arr?.length - 1
                        const isPathsTooLong =
                            paths?.length === 5 && paths[paths?.length - 1] === id

                        let displayText
                        if (isLastItem && isPathsTooLong) {
                            displayText = props.label
                        } else {
                            displayText = item
                                .split(/(?=[A-Z])/)
                                ?.map((subItem) => ` ${handleChangeName(subItem)}`)
                                .join('')
                        }

                        return (
                            <button
                                tabIndex={0}
                                role='button'
                                onClick={() => handleClick(item)}
                                key={index}
                                ref={breadCrumbRef}
                                aria-label={
                                    item === 'cart'
                                        ? 'cart bread crumbs'
                                        : 'place order bread crumbs'
                                }
                                className={twJoin(
                                    'capitalize',
                                    props?.buttonClassName,
                                    'inline-flex justify-center items-center gap-1 text-sm',
                                    props.titleName === 'Job Log' ||
                                        pathname.startsWith('/schedule/job-log')
                                        ? 'text-zinc-50'
                                        : '',
                                    getButtonClassName(
                                        navigates.find((navItem) => navItem.name === item)?.url ??
                                            '',
                                    ),
                                    isLastItem ? currentBreadcrumbClass : '',
                                )}
                                disabled={
                                    navigates.find((navItem) => navItem.name === item)?.url === '#'
                                }
                            >
                                {displayText}
                                {arr?.length !== index + 1 && <GrFormNext />}
                            </button>
                        )
                    })}
            </div>
        </div>
    )
}

export default BreadCrumbs
