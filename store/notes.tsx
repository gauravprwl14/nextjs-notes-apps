import { GetServerSidePropsContext } from 'next/types';
import { useState } from "react";
import { getAPIContext, CONSTANTS } from 'utils/helper';
import { fetcher, HttpMethods } from '../utils/fetcher'

import { INotes } from '@/types/note'



export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { baseUrl, headers } = getAPIContext(context)

    let users: any = []
    let notes = []

    try {

        notes = await fetcher(`${baseUrl}/api/notes/get`, HttpMethods.GET, headers, undefined)
        if (notes) {
            return notes
        } else {
            notes = []
        }

    } catch (error) {

    }

    return {
        props: {
            notes: notes,
            user: users
        },
    };

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

    const handleBtnClick = async (payload: any) => {
        console.log('%c window.c ', 'background: lime; color: black');

        const headers = {
            credentials: 'include'
        }
        try {
            const notes = await fetcher(`${CONSTANTS.baseUrl}/api/notes/create`, HttpMethods.POST, headers, { data: { note: payload, cid: '631c6d4b2e19c822dd05c8c2' } })
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
