import { AlertDialogCancel, AlertDialogContent, AlertDialogTitle } from '@/components/AlertDialog'
import { MdClose } from 'react-icons/md'
import { Button } from '@/components/Button'
import emptyPlaceholder from '@/assets/private/empty_placeholder.svg'
import { Label } from '@radix-ui/react-label'
import UpdateOrDelete from '../UpdateOrDelete'
import { NoteResponseType } from '@/api/notes/schema'
import { cn } from '@/utils/helper'
import { useLocation } from 'react-router-dom'

interface AddNotesProps {
    setIsListNotes: (isAddingNotes: boolean) => void
    notesList: NoteResponseType
    deleteNoteMu: (noteId: string) => void
    isDisabled?: boolean
}

const AddNotes = ({ setIsListNotes, notesList, deleteNoteMu, isDisabled }: AddNotesProps) => {
    const { pathname } = useLocation()

    return (
        <AlertDialogContent className='bg-white w-[577px] rounded-[15px] p-0'>
            <div className='flex-col gap-5 mb-[64px] px-[26.5px] pt-[27px]'>
                <div className='flex justify-between items-center w-full'>
                    <AlertDialogTitle className='font-semibold text-2xl text-[#191A0A] mt-[10px]'>
                        Notes
                    </AlertDialogTitle>
                    <AlertDialogCancel className='border-white'>
                        <MdClose className='text-lg' />
                    </AlertDialogCancel>
                </div>

                <div className='justify-center'>
                    {pathname !== '/manage-subs/trash' && (
                        <Button
                            className={cn(
                                'mt-[36px] mx-auto bg-[#F9F9F9] text-zentive-green-dark hover:text-gray-100 border border-zentive-green-dark w-full',
                                notesList?.data[0]?.notes?.length && '',
                            )}
                            onClick={() => {
                                setIsListNotes(false)
                            }}
                            disabled={isDisabled}
                        >
                            <b className='mr-2'>+</b>Add a Note
                        </Button>
                    )}
                </div>

                {/* If empty notes */}
                {!notesList?.data[0]?.notes?.length && (
                    <div className='mt-12 flex justify-center text-center'>
                        <div>
                            <img
                                src={emptyPlaceholder}
                                alt='email-logo'
                                className='w-full mb-6 h-48'
                            />
                            <Label className='text-2xl text-gray-900'>Currently Empty</Label>
                        </div>
                    </div>
                )}
                {/* If not empty */}
                <div className='my-4 px-2 max-h-60 overflow-y-auto'>
                    {!!notesList?.data[0]?.notes?.length &&
                        notesList?.data?.map((data) => (
                            <>
                                {data?.notes?.map((singleNote) => (
                                    <div className='my-3 overflow-y-hidden h-16 flex justify-between ring-1 ring-zentive-gray-medium rounded-[4px]'>
                                        <textarea
                                            className='w-full overflow-y-hidden p-3 font-sans-pro text-base h-24 border border-black border-r-0 disabled:bg-gray-100 text-gray-900 rounded-sm'
                                            placeholder='Description'
                                            disabled
                                        >
                                            {singleNote?.note}
                                        </textarea>
                                        <UpdateOrDelete
                                            deleteNote={() => {
                                                deleteNoteMu(singleNote?.noteId ?? '')
                                            }}
                                            profileId={singleNote?.profileId ?? ''}
                                            isDisabled={isDisabled}
                                        />
                                    </div>
                                ))}
                            </>
                        ))}
                </div>
            </div>
        </AlertDialogContent>
    )
}

export default AddNotes
