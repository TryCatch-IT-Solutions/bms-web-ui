import { EmployeeTable } from './EmployeeTable'
import { BreadCrumbs } from '@/components/BreadCrumbs'

export const EmployeeList: React.FC = () => {
    return (
        <div className='content'>
            <BreadCrumbs title='Employee List' origin='Employees' />
            <EmployeeTable />
        </div>
    )
}
