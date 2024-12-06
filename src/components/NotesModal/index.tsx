import { AlertDialog, AlertDialogTrigger } from '@/components/AlertDialog'
import { useState } from 'react'
import { HiOutlineDocument } from 'react-icons/hi2'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import AddNotes from './AddNotesModal'
import NoteList from './ViewNotesModal'
import { addBusinessNotes, deleteBusinessNotes, getBusinessNotes } from '@/api/notes'
import { NotePayloadType, NoteResponseType } from '@/api/notes/schema'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/helper'

interface NoteModalProps {
    profileId: string
    isDisabled?: boolean
}

const NoteModal = ({ profileId, isDisabled }: NoteModalProps) => {
    const { toast } = useToast()
    const [isListNotes, setIsListNotes] = useState<boolean>(true)
    const [notesList, setNotesList] = useState<NoteResponseType>()

    const { mutate: getNotesMu } = useMutation<NoteResponseType, AxiosError, string>({
        mutationFn: (profileId) => getBusinessNotes(profileId),
        onSuccess: (data: NoteResponseType) => {
            setNotesList(data)
        },
    })

    const { mutate: deleteNoteMu } = useMutation<unknown, AxiosError, string>({
        mutationFn: (noteId) => deleteBusinessNotes(noteId),
        onSuccess: () => {
            getNotesMu(profileId)
            toast({
                description: 'A note has been deleted successfully!',
                variant: 'default',
            })
        },
    })

    const { mutate: addNotesMu, isPending: addLoading } = useMutation<
        unknown,
        AxiosError,
        NotePayloadType
    >({
        mutationFn: (newNote) => addBusinessNotes(newNote),
        onSuccess: () => {
            getNotesMu(profileId),
                setIsListNotes(true),
                toast({
                    description: 'Successfully added a note!',
                    variant: 'default',
                })
        },
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger
                asChild
                onClick={() => {
                    getNotesMu(profileId)
                }}
            >
                <div className='text-center max-w-[150px] text-ellipsis overflow-hidden'>
                    <button key='note-icon' type='button'>
                        <HiOutlineDocument className={cn('mr-2 h-5 w-5')} />
                    </button>
                </div>
            </AlertDialogTrigger>

            {isListNotes ? (
                <AddNotes
                    setIsListNotes={setIsListNotes}
                    notesList={notesList as NoteResponseType}
                    deleteNoteMu={deleteNoteMu}
                    isDisabled={isDisabled}
                />
            ) : (
                <NoteList
                    setIsListNotes={setIsListNotes}
                    addLoading={addLoading}
                    profileId={profileId}
                    addNotesMu={addNotesMu}
                />
            )}
        </AlertDialog>
    )
}

export default NoteModal
