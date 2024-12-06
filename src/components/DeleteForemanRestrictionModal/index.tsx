import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { CrewMemberDetailsType } from '@/api/crew/schema'
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup'
import { FormItem } from '../Forms'
import { EmployeeCrewDetailsType } from '@/api/employee/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { assignForeman } from '@/api/crew'
import { useToast } from '@/hooks/useToast'
import { BusinessStatusType } from '@/api/business/schema'
import { updateProfileStatus } from '@/api/business'
import { useAtomValue, useSetAtom } from 'jotai'
import { profileStatusAtom } from '@/store/customer'
import { selectedEmployeeTabStatusAtom } from '@/store/employee'
import { useNavigate } from 'react-router-dom'
import { StatusType } from '@/store/auth'

interface DeleteForemanRestrictionModalProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    crewMemberDetails: EmployeeCrewDetailsType | null
    status: StatusType
}

const DeleteForemanRestrictionModal: React.FC<DeleteForemanRestrictionModalProps> = ({
    open,
    setOpen,
    crewMemberDetails,
    status,
}) => {
    const [newForemanId, setNewForewmanId] = useState<string | undefined>('')

    const radioChange = (val: string) => {
        setNewForewmanId(val)
    }

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const profileStatus = useAtomValue(profileStatusAtom)

    const setSelected = useSetAtom(selectedEmployeeTabStatusAtom)

    const { toast } = useToast()

    const { mutateAsync: updateProfileStatusMu } = useMutation<
        BusinessStatusType,
        AxiosError,
        BusinessStatusType
    >({
        mutationFn: updateProfileStatus,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['employeeList'] })
            toast({
                description: 'Employee status has been successfully updated',
                variant: 'default',
            })
            setSelected(data.status)
            navigate('/schedule/employee')
        },
        onError: () => {
            toast({
                description: 'Unable to delete/inactivate a crew that has an active job',
                variant: 'destructive',
            })
        },
    })

    const { mutate: assignForemanMu } = useMutation<unknown, AxiosError, string>({
        mutationFn: (foremanId) =>
            assignForeman(crewMemberDetails?.crewId as string, foremanId as string),
        onSuccess: () => {
            toast({
                description: 'Foreman updated successfully',
                variant: 'default',
            })

            setOpen(false)
            updateProfileStatusMu({
                ...(profileStatus as BusinessStatusType),
                status: status,
            })
        },
    })

    const handleAssign = () => {
        assignForemanMu(newForemanId as string)
    }

    return (
        <Modal
            isOpen={open}
            isHideCloseButton
            onClose={() => {
                setOpen(false)
            }}
            title=''
            titleClassName=''
            containerClassName='max-w-[600px]'
        >
            <div className=''>
                <div className='flex gap-5 px-10'>
                    <div className=''>
                        <h1 className='text-left font-semibold text-2xl text-gray-900 mt-2.5 capitalize'>
                            Select Foreman
                        </h1>
                        <p className='text-left text-sm text-gray-500 mt-5'>
                            {crewMemberDetails?.firstName} {crewMemberDetails?.lastName} is a
                            foreman. To remove a foreman, please assign a temporary crew foreman to
                            continue.
                        </p>

                        <div className='overflow-auto max-h-50'>
                            {crewMemberDetails?.members?.map((member: CrewMemberDetailsType) => (
                                <RadioGroup
                                    onValueChange={radioChange}
                                    value={newForemanId ?? ''}
                                    className='flex flex-col space-y-1'
                                    key={member.crewMemberId}
                                >
                                    <FormItem className='flex items-center space-x-3 space-y-0 border border-b-2 border-[#B6B6B6] border-t-0 border-x-0 py-3'>
                                        <RadioGroupItem
                                            value={member.crewMemberId as string}
                                            className='text-zentive-green-dark'
                                            checked={newForemanId == member.crewMemberId}
                                        />

                                        <b className='text-sm flex text-center'>
                                            {member?.firstName} {member?.lastName}
                                        </b>
                                    </FormItem>
                                </RadioGroup>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='mt-6 flex justify-end gap-x-4 bg-gray-300 py-6 px-6'>
                    <Button
                        onClick={() => setOpen(false)}
                        className='w-97 h-11 text-base font-semibold cursor-pointer'
                        variant={'outline'}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleAssign}
                        className='w-97 h-11 text-base font-semibold bg-zentive-green-dark hover:bg-zentive-green-medium cursor-pointer'
                    >
                        Assign
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteForemanRestrictionModal
