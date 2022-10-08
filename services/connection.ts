import { IPostNoteApiCallPayload, IUpdateConnectionNoteApiCallPayload, IAddNewConnectionApiCallPayload } from '@/types/api';
import { fetcher, HttpMethods } from 'utils/fetcher';
import { CONSTANTS } from 'utils/helper';


export const getConnectionDetailsAPICall = async (cid: String) => {
    const headers = {
        credentials: 'include'
    }
    const response = await fetcher(`${CONSTANTS.baseUrl}/api/connection/${cid}`, HttpMethods.GET, headers, undefined)


    return response
}


export const updateConnectionNoteAPICall = async (payload: IUpdateConnectionNoteApiCallPayload) => {
    const headers = {
        credentials: 'include'
    }
    const notes = await fetcher(`${CONSTANTS.baseUrl}/api/connection/updateNote`, HttpMethods.PUT, headers, payload)
    return notes
}

export const addNewConnectionAPICall = async (payload: IAddNewConnectionApiCallPayload) => {
    const headers = {
        credentials: 'include'
    }
    const connectionObj = await fetcher(`${CONSTANTS.baseUrl}/api/connection/create`, HttpMethods.POST, headers, payload)
    return connectionObj
}
