import { GetServerSidePropsContext } from 'next/types';
import { useState, useEffect } from "react";
import { getAPIContext, CONSTANTS } from 'utils/helper';
import { fetcher, HttpMethods } from '../utils/fetcher'
import { dehydrate, DehydratedState, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { INote, INotes, ISlateNote, IConnectionDetails } from '@/types/note'
import { updateConnectionNoteAPICall, addNewConnectionAPICall } from 'services/connection';


export const CONNECTION_ID = '631c6d4b2e19c822dd05c8c2'

export const initialConnectionDetails: () => IConnectionDetails = () => {
    return {
        _id: null,
        name: '',
    }
};


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


export const useAddNewConnectionController = () => {
    const queryClient = useQueryClient()
    // Mutations
    const addNewConnectionMutation = useMutation(addNewConnectionAPICall, {
        onSuccess: () => {
            // Invalidate and refetch
            // queryClient.invalidateQueries(['connectionDetails'])
            queryClient.invalidateQueries(['connectionList'])
        },
    })

    return {
        addNewConnectionMutation
    }
}


export const useAddConnectionModal = () => {
    let [isOpen, setIsOpen] = useState(false)

    const [connectionDetails, setConnectionDetails] = useState(initialConnectionDetails())
    const { addNewConnectionMutation } = useAddNewConnectionController()

    const closeModal = () => {
        setIsOpen(false)
        resetConnectionDetails()
    }

    const openModal = () => {
        setIsOpen(true)
    }


    const updateConnectionDetails = (newConnectionDetails: IConnectionDetails) => {
        setConnectionDetails(newConnectionDetails)
    }

    const resetConnectionDetails = () => {
        setConnectionDetails(initialConnectionDetails())
    }

    const handleAddNewConnectionBtnClick = (newConnectionDetails: IConnectionDetails) => {
        const payload = {
            data: {
                connectionDetails: newConnectionDetails
            }
        }
        addNewConnectionMutation.mutate(payload)
    }

    return {
        isOpen,
        closeModal,
        openModal,
        connectionDetails,
        updateConnectionDetails,
        resetConnectionDetails,
        handleAddNewConnectionBtnClick
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

