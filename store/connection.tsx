import { GetServerSidePropsContext } from 'next/types';
import { useState, useEffect } from "react";
import { getAPIContext, CONSTANTS } from 'utils/helper';
import { fetcher, HttpMethods } from '../utils/fetcher'
import { dehydrate, DehydratedState, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { INote, INotes, ISlateNote } from '@/types/note'
import { updateConnectionNoteAPICall } from 'services/connection';


export const CONNECTION_ID = '631c6d4b2e19c822dd05c8c2'


export const useUpdateConnectionNoteController = () => {
    const [isEditMode, setEditMode] = useState(false);
    const queryClient = useQueryClient()

    // Mutations
    const updateConnectionNoteMutation = useMutation(updateConnectionNoteAPICall, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['connectionDetails'])
            setEditMode(false)
        },
    })


    return {
        isEditMode,
        setEditMode,
        updateConnectionNoteMutation
    }
}



export const useConnectionController = () => {


    const {
        isEditMode,
        setEditMode,
        updateConnectionNoteMutation
    } = useUpdateConnectionNoteController()



    const handleConnectionNoteUpdateBtnClick = async (payload: ISlateNote) => {

        const requestPayload = { data: { note: payload, cid: CONNECTION_ID } }
        updateConnectionNoteMutation.mutate(requestPayload)

    }


    return {
        isEditMode,
        setEditMode,
        handleConnectionNoteUpdateBtnClick,
    }


}

