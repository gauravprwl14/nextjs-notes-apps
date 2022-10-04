import { GetServerSidePropsContext } from 'next/types';
import { useState, useEffect } from "react";
import { getAPIContext, CONSTANTS } from 'utils/helper';
import { fetcher, HttpMethods } from '../utils/fetcher'
import { dehydrate, DehydratedState, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { INote, INotes, ISlateNote } from '@/types/note'
import { updateUserNoteAPICall } from 'services/user';


export const CONNECTION_ID = '631c6d4b2e19c822dd05c8c2'


export const useUpdateUserNoteController = () => {
    const [isEditMode, setEditMode] = useState(false);
    const queryClient = useQueryClient()

    // Mutations
    const updateUserNoteMutation = useMutation(updateUserNoteAPICall, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['userDetails'])
            setEditMode(false)
        },
    })


    return {
        isEditMode,
        setEditMode,
        updateUserNoteMutation
    }
}



export const useUserController = () => {


    const {
        isEditMode,
        setEditMode,
        updateUserNoteMutation
    } = useUpdateUserNoteController()



    const handleUserNoteUpdateBtnClick = async (payload: ISlateNote) => {

        const requestPayload = { data: { note: payload } }
        updateUserNoteMutation.mutate(requestPayload)

    }


    return {
        isEditMode,
        setEditMode,
        handleUserNoteUpdateBtnClick,
    }


}

