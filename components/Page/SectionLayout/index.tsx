import { FunctionComponent, useState } from "react";
import ProfileSection, { Content } from './ProfileSection'
import Editor from './Editor'
import NoteList from './NoteList'
import MyNotes from './MyNotes'

import { useNotesController } from '@/store/notes';
import { INote } from "@/types/note";
import { useSelectConnectionController } from "@/store/connection";

interface ISectionLayoutProps {

}


const SectionLayout: FunctionComponent<ISectionLayoutProps> = ({ }) => {
    const { setNotes, note, handleBtnClick, handleNoteEdit, handleNoteDelete } = useNotesController([])

    const {
        selectConnection,
        setSelectedConnection,
        connectionList,
        isConnectionListLoading
    } = useSelectConnectionController()

    const handleChange = (newState: any) => {
        setNotes(newState)
    }

    const handleAddNotes = (localNote: any) => {
        // e.preventDefault()

        // todo handle the error condition,show a toast msg or disable the btn if connection obj is not present
        if (selectConnection?._id) {
            handleBtnClick(localNote, selectConnection._id)
        }

    }

    const handleEditBtnClick = (payload: { noteObj: INote }) => {

        handleNoteEdit(payload)
    }

    const handleDeleteBtnClick = (noteObj: INote) => {

        // todo handle the error condition,show a toast msg or disable the btn if connection obj is not present
        if (selectConnection?._id) {
            handleNoteDelete(noteObj, selectConnection._id)
        }
    }

    return (
        <div className="flex flex-row w-full h-full">

            <div className="w-[25%] bg-whiteSmoke h-full pt-3 px-7">
                <ProfileSection
                    selectConnection={selectConnection}
                    setSelectedConnection={setSelectedConnection}
                    connectionList={connectionList}
                    isConnectionListLoading={isConnectionListLoading}
                />
            </div>
            <div className="w-[50%] flex-wrap overflow-auto pt-3 px-7 relative">
                <div className="w-full shadow-lg flex-wrap flex-1 border-4 px-6 rounded bg-white mb-5">
                    <Editor
                        note={note}
                        handleChange={handleChange}
                        handleAddNote={handleAddNotes}
                    />
                </div>

                <NoteList
                    onEditBtnClick={handleEditBtnClick}
                    onDeleteClick={handleDeleteBtnClick}
                    cObj={selectConnection}
                />
            </div>
            <div className="w-[25%] border-l-2 pl-6"> <MyNotes /></div>

        </div>
    )
}

export default SectionLayout