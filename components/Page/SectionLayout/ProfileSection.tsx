import { useEffect } from 'react'
import { CONNECTION_ID, useConnectionController } from "@/store/connection";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { BiPencil } from 'react-icons/bi';
import { getConnectionDetailsAPICall, getConnectionListAPICall } from "services/connection";
import Editor from './Editor'
import { cloneDeep, initialEditorValue } from '@/store/notes';

interface Props {

}


const ProfileIcon = () => {

    return <img className=" w-11 h-11 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
}


interface ISectionLayoutProps {

}


export const Content = ({ note, handleSaveNotes, handleChange, isEditMode }: any) => {
    let localNote = note ? note : cloneDeep(initialEditorValue)

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



const ProfileSection: FunctionComponent<Props> = ({ }) => {
    const { isEditMode, setEditMode, handleConnectionNoteUpdateBtnClick } = useConnectionController()
    const [note, setNotes] = useState()

    const handleChange = (newState: any) => {
        setNotes(newState)
    }

    let { isLoading, data } = useQuery(['connectionDetails'], () =>
        getConnectionDetailsAPICall(CONNECTION_ID)
    );

    let { isLoading: isConnectionListLoading, data: connectionList } = useQuery(['connectionList'], () =>
        getConnectionListAPICall()
    );

    useEffect(() => {
        let note = data?.data?.personnelNote?.note
        console.log('%c note inside the profile section', 'background: black; color: yellow', { note, data });
        setNotes(note)

    }, [data]
    )


    const handleSaveNotes = (localNote: any) => {
        handleConnectionNoteUpdateBtnClick(localNote)
    }

    return (
        <div>
            <div className="flex mt-3 flex-row justify-between items-center">
                <div className=" flex flex-row justify-center items-center">
                    <ProfileIcon />
                    <div className=" ml-4 ">
                        <span className="text-terraCotta font-Inter font-bold text-lg"> John  Smith </span>
                    </div>
                </div>

                <div className=' cursor-pointer'>
                    {
                        !isEditMode && <div onClick={() => {
                            setEditMode(true)
                        }}><BiPencil /></div>
                    }

                </div>
            </div>
            <Content
                note={note}
                handleSaveNotes={handleSaveNotes}
                handleChange={handleChange}
                isEditMode={isEditMode}
            />
        </div>
    )
}

export default ProfileSection