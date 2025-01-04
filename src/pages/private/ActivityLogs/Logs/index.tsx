import { BreadCrumbs } from '@/components/BreadCrumbs'
import React from 'react'
import { LogsTable } from '../../ActivityLogs/Logs/LogsTable'

export const ActivityLogs: React.FC = () => {
    return (
        <div className='content w-full'>
            <BreadCrumbs title={'Activity Logs'} origin='Logs' />
            <LogsTable />
        </div>
    )
}
