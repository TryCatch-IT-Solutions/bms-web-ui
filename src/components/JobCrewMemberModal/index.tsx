import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
} from '@/components/AlertDialog'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CreateJobWithoutQuoteType, CreateJobWithQuoteType } from '@/api/job/schema'
import { Form } from '../Forms'
import { Button } from '../Button'

interface JobCrewMemberModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    submit: (d: CreateJobWithoutQuoteType | CreateJobWithQuoteType) => void
    methods: UseFormReturn<CreateJobWithoutQuoteType | CreateJobWithQuoteType>
    onClose?: () => void
}

const JobCrewMemberModal: React.FC<JobCrewMemberModalProps> = ({
    setOpen,
    open,
    submit,
    methods,
    onClose,
}) => {
    return (
        <Form {...methods}>
            <AlertDialog onOpenChange={(o) => setOpen(o)} open={open}>
                <AlertDialogContent className='bg-white h-[285px] w-[577px] rounded-[15px] p-0'>
                    <div className='flex gap-5 px-6 pt-10'>
                        <div className='flex justify-center items-center bg-zentive-red-light h-16 w-16 rounded-full'>
                            <HiOutlineExclamationTriangle className='h-6 w-6 mx-5  yx-5 text-red-500' />
                        </div>
                        <div className=' overflow-auto'>
                            <AlertDialogTitle className='text-left font-semibold text-2xl text-gray-900 mt-2.5'>
                                No Crew Assigned
                            </AlertDialogTitle>
                            <AlertDialogDescription className='text-left text-sm text-gray-500 mt-5'>
                                You are about to save this job without assigning a crew. Don't worry
                                you could still make changes later.
                            </AlertDialogDescription>
                            <AlertDialogDescription className='text-left text-sm text-gray-500 mt-5'>
                                Are you sure you want to proceed without assigning a crew?
                            </AlertDialogDescription>
                        </div>
                    </div>
                    <AlertDialogFooter className='mx-0 bg-gray-100 rounded-b-[15px] pr-6 pb-4 pt-1.5'>
                        <div className='w-full flex justify-end items-end gap-4'>
                            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                            <Button
                                type='submit'
                                className='w-97 h-11 text-base font-semibold bg-zentive-green-dark hover:bg-zentive-green-dark/90'
                                disabled={methods.formState.isSubmitting}
                                onClick={methods.handleSubmit(submit)}
                            >
                                Yes, please
                            </Button>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Form>
    )
}

export default JobCrewMemberModal
