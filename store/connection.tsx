import { GetServerSidePropsContext } from 'next/types';
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getConnectionDetailsAPICall, getConnectionListAPICall } from "services/connection";
import { getAPIContext, CONSTANTS } from 'utils/helper';
import { fetcher, HttpMethods } from '../utils/fetcher'
import { dehydrate, DehydratedState, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { INote, INotes, ISlateNote, IConnectionDetails } from '@/types/note'
import { updateConnectionNoteAPICall, addNewConnectionAPICall } from 'services/connection';
import { IAddNewConnectionApiCallPayload } from '@/types/api';


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
        onSuccess: (data, payload: IAddNewConnectionApiCallPayload) => {
            // Invalidate and refetch
            // queryClient.invalidateQueries(['connectionDetails'])
            payload?.onSuccessCb()
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
            },
            onSuccessCb: () => {
                closeModal()
            },
            onErrorCb: () => {
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
        handleAddNewConnectionBtnClick,
        addNewConnectionMutation

    }
}


export const useSelectConnectionController = () => {
    const [selectConnection, setSelectedConnection] = useState<IConnectionDetails | null>(null)

    let { isLoading: isConnectionListLoading, data: connectionList } = useQuery(['connectionList'], () =>
        getConnectionListAPICall(),

        {
            onSuccess: (data: { data: { connections: IConnectionDetails[] } }) => {
                const connections = data?.data?.connections || []
                // const { connections } = data?.data
                if (!selectConnection && connections?.length) {
                    setSelectedConnection(connections[0])
                }
            },
            onError: () => {
                // TODO
            }
        }
    );



    return {
        selectConnection,
        setSelectedConnection,
        connectionList,
        isConnectionListLoading


    }

}



export const useConnectionController = () => {


    const {
        isEditMode,
        setEditMode,
        updateConnectionNoteMutation
    } = useUpdateConnectionNoteController()



    const handleConnectionNoteUpdateBtnClick = async (payload: ISlateNote, cid: String) => {

        const requestPayload = { data: { note: payload, cid } }
        updateConnectionNoteMutation.mutate(requestPayload)

    }


    return {
        isEditMode,
        setEditMode,
        handleConnectionNoteUpdateBtnClick,
    }


}

