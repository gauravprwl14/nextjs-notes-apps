import { CONNECTION_ID } from "@/store/notes";
import { INote } from "@/types/note";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { BiPencil } from 'react-icons/bi';
import { getNotesListAPICall } from "services/note";
import { Editable, withReact, useSlate, Slate, useReadOnly } from 'slate-react'


interface INoteListProps {

}


const SearchBar = () => {
    return (
        <form>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-terraCotta hover:bg-terraCotta focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-terraCotta dark:hover:bg-terraCotta dark:focus:ring-blue-800">Search</button>
            </div>
        </form>

    )
}



const NotesList: FunctionComponent<INoteListProps> = ({ }) => {

    let { isLoading, data } = useQuery(['notes'], () =>
        getNotesListAPICall(CONNECTION_ID)
    );

    let notes = data?.data?.notes

    if (Object.keys(notes || {}).length <= 0) {
        notes = []
    }
    console.log('%c notes asdasda', 'background: lime; color: black', { notes });


    return (
        <div className="flex mt-10 flex-col">
            <div className=" flex flex-row flex-1 mb-6">
                <div className=" ml-4 ">
                    <span className="text-terraCotta font-Inter font-normal text-lg"> All Notes </span>
                </div>
            </div>

            <div>
                <SearchBar />
            </div>
            {
                notes?.map((note: INote, index: number) => {
                    return (
                        <>
                            {/* <Editable
                                placeholder="Enter some rich text…"
                                spellCheck
                                autoFocus
                                style={{
                                    minHeight: 200
                                }}
                                readOnly
                            /> */}
                            <div key={index} className="w-full shadow-lg flex-wrap flex-1 border-2 px-2 py-2 my-1 rounded bg-white ">
                                <p className="line-clamp-2"> {note.plainText} </p>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default NotesList