import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { CONNECTION_ID, useConnectionController } from "@/store/connection";
import SelectSearch from '@/components/SelectSearch'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { BiPencil } from 'react-icons/bi';
import { getConnectionDetailsAPICall, getConnectionListAPICall } from "services/connection";
import Editor from './Editor'
import { cloneDeep, initialEditorValue } from '@/store/notes';
import { useSelectConnectionController } from '@/store/connection';
import { IConnectionDetails } from '@/types/note';

interface IProfileSectionProps {
    selectConnection: IConnectionDetails | null
    setSelectedConnection: Dispatch<SetStateAction<IConnectionDetails | null>>;
    connectionList: {
        data: {
            connections: IConnectionDetails[];
        };
    } | undefined
    isConnectionListLoading: boolean
}


const ProfileIcon = () => {

    return (
        // <div className='w-11 flex rounded-full'>
        //     <Image
        //         width={"44px"}
        //         height={"44px"}
        //         layout="responsive" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
        // </div>
        <img className="w-11 h-11 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
    )
}


interface ISectionLayoutProps {

}


export const Content = ({ note, handleSaveNotes, handleChange, isEditMode, username }: any) => {
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



const ProfileSection: FunctionComponent<IProfileSectionProps> = ({ selectConnection, setSelectedConnection, connectionList, isConnectionListLoading }) => {
    const queryClient = useQueryClient()
    const { isEditMode, setEditMode, handleConnectionNoteUpdateBtnClick } = useConnectionController()

    const [note, setNotes] = useState()

    const handleChange = (newState: any) => {
        setNotes(newState)
    }
    const onChangingConnectionObj = (newState: any) => {
        setSelectedConnection(newState)
        queryClient.fetchQuery
    }

    console.log('%c 5555 selectConnection ', 'background: lime; color: black', { selectConnection });

    let { isLoading, data } = useQuery(['connectionDetails', selectConnection?._id], () => {
        const cid = selectConnection?._id
        if (cid) {
            return getConnectionDetailsAPICall(cid)
        }
    },
        {
            enabled: selectConnection?._id ? true : false
        }


    );



    useEffect(() => {
        let note = data?.data?.personnelNote?.note
        setNotes(note)

    }, [data]
    )


    const handleSaveNotes = (localNote: any) => {
        // TODO add a check if selected connection obj is present or not
        // TODO also disable the edit/save btn selectConnection ===null
        handleConnectionNoteUpdateBtnClick(localNote, selectConnection?._id || '')
    }

    return (
        <div>
            <div className="flex mt-3 flex-row justify-between items-center">
                <div className=" flex flex-row justify-center items-center">
                    <ProfileIcon />
                    <div className=" ml-4 ">
                        <SelectSearch
                            data={connectionList?.data?.connections || []}
                            selected={selectConnection}
                            setSelected={onChangingConnectionObj}
                        />
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
                username={data?.data?.name}
            />
        </div>
    )
}

export default ProfileSection