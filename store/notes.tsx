import { GetServerSidePropsContext } from 'next/types';
import { useState } from "react";
import { getAPIContext, CONSTANTS } from 'utils/helper';
import { fetcher, HttpMethods } from '../utils/fetcher'

import { INote, INotes } from '@/types/note'
import { getNotesListAPICall, postNoteAPICall } from 'services/note';
import { dehydrate, DehydratedState, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';


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


let initialNote = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: 'bold', bold: true },
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }],
    },
]


// initialNote = []


export const useNotesController = (notes: INotes[]) => {
    const [note, setNotes] = useState(initialNote);

    const queryClient = useQueryClient()

    // Mutations
    const mutation = useMutation(postNoteAPICall, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['notes'])
        },
    })

    const handleBtnClick = async (payload: any) => {
        console.log('%c window.c ', 'background: lime; color: black', { payload });

        const headers = {
            credentials: 'include'
        }
        try {
            const requestPayload = { data: { note: payload, cid: CONNECTION_ID } }

            mutation.mutate(requestPayload)
            // const notes = await fetcher(`${CONSTANTS.baseUrl}/api/notes/create`, HttpMethods.POST, headers, requestPayload)
            console.log('%c notes handleBtnClick', 'background: lime; color: black', { notes });
        } catch (error) {
            console.log('%c error inside handleBtnClick notes ', 'background: salmon; color: black');
        }

    }




    return {
        setNotes,
        note,
        handleBtnClick
    };
};
