import { GetServerSidePropsContext } from 'next/types';
import { useState, useEffect } from "react";
import { getAPIContext, CONSTANTS } from 'utils/helper';
import { fetcher, HttpMethods } from '../utils/fetcher'

import { IConnectionDetails, INote, INotes, ISlateNote } from '@/types/note'
import { getNotesListAPICall, postNoteAPICall, updateNoteAPICall, deleteNoteAPICall } from 'services/note';
import { dehydrate, DehydratedState, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAddConnectionModal } from 'store/connection'

export const CONNECTION_ID = '631c6d4b2e19c822dd05c8c2'


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: { dehydratedState: DehydratedState | null } }> {
    try {
        const queryClient = new QueryClient()


        await queryClient.prefetchQuery(['notes'], () => getNotesListAPICall(CONNECTION_ID));

        return {
            props: {
                dehydratedState: dehydrate(queryClient)
            }
        }
    } catch (error) {
        return {
            props: {
                dehydratedState: null
            }
        }
    }



    // const { baseUrl, headers } = getAPIContext(context)

    // let users: any = []
    // let notes: INote[] = []

    // try {

    //     notes = await fetcher(`${baseUrl}/api/notes/get?cid=${CONNECTION_ID}`, HttpMethods.GET, headers, undefined)
    //     // notes = await getNotesListAPICall(CONNECTION_ID)

    //     console.log('%c notes inside  getServerSideProps', 'background: lime; color: black', { notes });


    //     if (notes) {
    //         return notes
    //     } else {
    //         notes = []
    //     }

    // } catch (error) {
    //     console.log('%c error inside notes getServerSideProps', 'background: salmon; color: black', { error });
    // }

    // return {
    //     props: {
    //         notes: notes,
    //         user: users
    //     },
    // };


}


export const cloneDeep = (obj: any) => {
    return JSON.parse(JSON.stringify(obj))
}

export const initialEditorValue: () => ISlateNote = () => {
    const defaultValue = [{
        type: 'paragraph',
        children: [{ text: '' }],
    }]

    return defaultValue;
}






const useUpdateNoteController = () => {
    const [selectedNoteObj, setSelectedNodeObj] = useState<INote | null>(null);

    const queryClient = useQueryClient()



    // Update Mutations
    const updateNoteMutation = useMutation(updateNoteAPICall, {
        onSuccess: () => {
            // Invalidate and refetch
            // TODO pass the connection id
            queryClient.invalidateQueries(['notes'])
            setSelectedNodeObj(null)
        },
        onError: (error) => {
            // // Invalidate and refetch
            // TODO handle the error and show the notification
            setSelectedNodeObj(null)

            console.log('%c handle error useUpdateNoteController ', 'background: salmon; color: black', { error });
        },
    })


    // Delete Mutations
    const deleteNoteMutation = useMutation(deleteNoteAPICall, {
        onSuccess: () => {
            // Invalidate and refetch
            // TODO pass the connection id
            queryClient.invalidateQueries(['notes'])
            setSelectedNodeObj(null)
        },
        onError: (error) => {
            // // Invalidate and refetch
            // queryClient.invalidateQueries(['notes'])
            setSelectedNodeObj(null)

            console.log('%c handle error useUpdateNoteController ', 'background: salmon; color: black', { error });
        },
    })







    return {
        updateNoteMutation,
        selectedNoteObj,
        setSelectedNodeObj,
        deleteNoteMutation
    }
}

const usePostNoteController = () => {
    const queryClient = useQueryClient()

    // Mutations
    const postNoteMutation = useMutation(postNoteAPICall, {
        onSuccess: () => {
            // Invalidate and refetch
            // TODO pass the connection id
            queryClient.invalidateQueries(['notes'])
        },
    })


    return {
        postNoteMutation
    }
}








export const useNotesController = (notes?: INotes[]) => {

    const [note, setNotes] = useState(initialEditorValue());
    const [notesSearchQuery, setNotesSearchQuery] = useState('')


    const {
        updateNoteMutation,
        deleteNoteMutation,
        selectedNoteObj,
        setSelectedNodeObj
    } = useUpdateNoteController();


    const connectionState = useAddConnectionModal()


    const {
        postNoteMutation,

    } = usePostNoteController();


    function resetSelectedNotesObject() {
        setNotes(initialEditorValue());
        setSelectedNodeObj(null);
    }


    useEffect(() => {

        return () => {
            resetSelectedNotesObject()
        }
    }, [setSelectedNodeObj])











    // Handlers

    const handleBtnClick = async (payload: ISlateNote, cid: string) => {
        console.log('%c window.c ', 'background: lime; color: black', { payload });

        const headers = {
            credentials: 'include'
        }
        try {


            if (selectedNoteObj) {
                const requestPayload = { data: { note: payload, cid, nodeId: selectedNoteObj._id } }
                updateNoteMutation.mutate(requestPayload)
            } else {
                const requestPayload = { data: { note: payload, cid } }
                postNoteMutation.mutate(requestPayload)
            }


            // const notes = await fetcher(`${CONSTANTS.baseUrl}/api/notes/create`, HttpMethods.POST, headers, requestPayload)
            console.log('%c notes handleBtnClick', 'background: lime; color: black', { notes });
        } catch (error) {
            console.log('%c error inside handleBtnClick notes ', 'background: salmon; color: black', { error });
        }

    }


    // Handlers

    const handleNoteEdit = async (payload: { noteObj: INote }) => {
        const { noteObj } = payload
        console.log('%c selectedNoteObj payload ', 'background: lime; color: black', { payload, selectedNoteObj });
        if (selectedNoteObj) {
            // already one note is selected for edit
            // todo show a confirmation modal before proceeding
            setSelectedNodeObj(noteObj)
            setNotes(noteObj.note)
        } else {
            setSelectedNodeObj(noteObj)
            setNotes(noteObj.note)
        }


    }

    const handleNoteDelete = async (selectedNoteObj: INote, cid: string) => {
        const requestPayload = { data: { cid, nodeId: selectedNoteObj._id } }


        deleteNoteMutation.mutate(requestPayload)


    }






    return {
        setNotes,
        note,
        handleBtnClick,
        handleNoteEdit,
        handleNoteDelete,
        resetSelectedNotesObject,
        notesSearchQuery,
        setNotesSearchQuery,

        ...connectionState
    };
};
