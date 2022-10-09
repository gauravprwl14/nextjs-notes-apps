import React from 'react'
import Editor from '../Editor'
import { initialEditorValue } from '@/store/notes';
import { ISlateNote } from '@/types/note';

interface IEditorControllerProps {
    note: ISlateNote | null | undefined
    handleSaveNotes: (...args: any) => void
    handleChange: (...args: any) => void
    isEditMode: boolean
}



export const EditorController = ({ note, handleSaveNotes, handleChange, isEditMode }: IEditorControllerProps) => {
    let localNote = note ? note : initialEditorValue()

    return (
        <div className={`w-full  flex-wrap flex-1  px-6 rounded  mt-4 mb-5 ${isEditMode ? 'border-4 bg-white shadow-lg' : ''}`}>
            <Editor
                note={localNote}
                handleChange={handleChange}
                handleAddNote={handleSaveNotes}
                btnText={'Save'}
                isEditModeEnable={isEditMode}
            />
        </div>
    )
}

export default EditorController