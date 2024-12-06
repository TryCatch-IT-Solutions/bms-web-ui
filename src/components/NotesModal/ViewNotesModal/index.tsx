import { AlertDialogContent, AlertDialogTitle } from '@/components/AlertDialog'
import { MdClose } from 'react-icons/md'
import { Button } from '@/components/Button'
import { Textarea } from '@/components/TextArea'
import { useState } from 'react'
import { NotePayloadType } from '@/api/notes/schema'
import dayjs from 'dayjs'

interface NoteListProps {
    setIsListNotes: (isAddingNotes: boolean) => void
    addLoading: boolean
    profileId: string
    addNotesMu: (noteData: NotePayloadType) => void
}

const NoteList = ({ setIsListNotes, addLoading, profileId, addNotesMu }: NoteListProps) => {
    const [newNoteContent, setNewNoteContent] = useState<string>('')
    const now = dayjs()

    return (
        <AlertDialogContent className='bg-white w-[577px] rounded-[15px] p-0'>
            <div className='flex-col gap-5 px-[26.5px] pt-[27px]'>
                <AlertDialogTitle className='flex justify-between w-full font-semibold text-2xl text-[#191A0A] mt-[10px]'>
                    Notes
                    <button
                        onClick={() => {
                            setIsListNotes(true)
                        }}
                    >
                        <MdClose />
                    </button>
                </AlertDialogTitle>
                <div className='flex-col justify-betweenh-[229px] w-full ring-1 mt-[37px] mb-[52px] rounded-[4px] ring-zentive-gray-medium'>
                    <Textarea
                        className='border-white w-full h-[168px] focus-visible:ring-0 focus-visible:ring-offset-0'
                        name='notes'
                        onChange={(event) => {
                            const inputVal = event.target.value
                            if (inputVal?.length <= 1000) {
                                setNewNoteContent(inputVal)
                            } else {
                                // Limit the input value to 200 characters only
                                const truncatedVal = inputVal.slice(0, 200)
                                setNewNoteContent(truncatedVal)
                            }
                        }}
                        value={newNoteContent}
                    />
                    <div className='flex justify-between mx-2 text-zentive-gray-medium text-[12px]'>
                        <p> {dayjs(now).format('MMMM DD, YYYY hh:mm a')}</p>
                        <p>{`${newNoteContent?.length}/1000`}</p>
                    </div>
                    <div className='flex justify-end h-[61px] items-center bg-[#EBEBEB] rounded-b-[4px]'>
                        <Button
                            className='w-97 h-[43px] mr-[7px] b-[16px] text-white bg-[#3a671a] rounded-[5px] font-sans-pro font-semibold text-base hover:bg-zentive-green-medium'
                            disabled={addLoading || newNoteContent.trim()?.length == 0}
                            onClick={() => {
                                const newNoteData = {
                                    profileId: profileId,
                                    note: newNoteContent,
                                } as NotePayloadType

                                addNotesMu(newNoteData)
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </AlertDialogContent>
    )
}

export default NoteList
