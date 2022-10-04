import { IPostNoteApiCallPayload, IUpdateNoteApiCallPayload } from '@/types/api';
import { fetcher, HttpMethods } from 'utils/fetcher';
import { CONSTANTS } from 'utils/helper';


export const getNotesListAPICall = async (cid: String) => {
    const headers = {
        credentials: 'include'
    }
    const response = await fetcher(`${CONSTANTS.baseUrl}/api/notes/get?cid=${cid}`, HttpMethods.GET, headers, undefined)


    return response
}


export const postNoteAPICall = async (payload: IPostNoteApiCallPayload) => {
    const headers = {
        credentials: 'include'
    }
    const notes = await fetcher(`${CONSTANTS.baseUrl}/api/notes/create`, HttpMethods.POST, headers, payload)
    return notes
}


export const updateNoteAPICall = async (payload: IUpdateNoteApiCallPayload) => {
    const headers = {
        credentials: 'include'
    }
    const notes = await fetcher(`${CONSTANTS.baseUrl}/api/notes/update`, HttpMethods.PUT, headers, payload)
    return notes
}

