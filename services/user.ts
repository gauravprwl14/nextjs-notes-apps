import { IUpdateUserNoteApiCallPayload } from '@/types/api';
import { fetcher, HttpMethods } from 'utils/fetcher';
import { CONSTANTS } from 'utils/helper';


export const getUserDetailsAPICall = async () => {
    const headers = {
        credentials: 'include'
    }
    const response = await fetcher(`${CONSTANTS.baseUrl}/api/users/get`, HttpMethods.GET, headers, undefined)


    return response
}


export const updateUserNoteAPICall = async (payload: IUpdateUserNoteApiCallPayload) => {
    const headers = {
        credentials: 'include'
    }
    const notes = await fetcher(`${CONSTANTS.baseUrl}/api/users/updateNote`, HttpMethods.PUT, headers, payload)
    return notes
}
