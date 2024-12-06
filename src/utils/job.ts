import { ReadJobType } from '@/api/job/schema'
import { JOB_STATUS, JobStatus } from '@/constants'

export const filterJobListByStatus = (jobList: ReadJobType[], jobStatus: JobStatus) =>
    jobStatus === JOB_STATUS.ALL
        ? jobList // Return all jobs if 'ALL' is selected
        : jobList?.filter((job) => job.status === jobStatus)
