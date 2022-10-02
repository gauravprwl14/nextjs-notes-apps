import { FunctionComponent, useState } from "react";
import ProfileSection, { Content } from './ProfileSection'
import Editor from './Editor'
import NoteList from './NoteList'
import MyNotes from './MyNotes'

import { useNotesController } from '@/store/notes';
import { INote } from "@/types/note";

interface ISectionLayoutProps {

}


const SectionLayout: FunctionComponent<ISectionLayoutProps> = ({ }) => {
    const { setNotes, note, handleBtnClick } = useNotesController([])

    const handleChange = (newState: any) => {
        setNotes(newState)
    }

    const handleAddNotes = (e: React.FormEvent<MouseEvent>) => {
        // e.preventDefault()


        handleBtnClick(note)
    }

    return (
        <div className="flex flex-row w-full h-full">

            <div className="flex-1 w-[25%] bg-whiteSmoke h-full pt-3 px-7">
                <ProfileSection />
                <Content />
            </div>
            <div className="flex-1 w-[50%] flex-wrap overflow-auto pt-3 px-7 relative">
                <div className="w-full shadow-lg flex-wrap flex-1 border-4 px-6 rounded bg-white mb-5">
                    <Editor
                        note={note}
                        handleChange={handleChange}
                        handleAddNote={handleAddNotes}
                    />
                </div>

                <NoteList />
            </div>
            <div className="flex-1 w-[25%] border-l-2 pl-6"> <MyNotes /></div>

        </div>
    )
}

export default SectionLayout