import { Fragment } from 'react'
import { CONNECTION_ID } from "@/store/notes";
import { INote, INoteEditFnHandler } from "@/types/note";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { BiPencil, } from 'react-icons/bi';
import { FaEllipsisH, FaTrash } from "react-icons/fa";

import { getNotesListAPICall } from "services/note";
import { Editable, withReact, useSlate, Slate, useReadOnly } from 'slate-react'
import { Menu, Transition } from '@headlessui/react'

interface INoteListProps {
    onEditBtnClick: (payload: { noteObj: INote }) => void
    onDeleteClick: (noteObj: INote) => void
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


const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
]

const OptionsMenu = ({ onEdit, onDelete }: {
    onEdit: (e: any) => void
    onDelete: (e: any) => void
}) => {
    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left w-full">
                <div className='flex  justify-between align-middle'>
                    <div className='text-silverChalice text-xs flex align-middle'> 13 June, 2022  11:00 AM </div>
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 text-silverChalice px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <FaEllipsisH />
                        </Menu.Button>
                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                        <div className="px-1 py-1" onClick={onEdit}>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-whiteSmoke text-gray-900' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <BiPencil
                                                className="mr-2 h-3 w-3"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <BiPencil
                                                className="mr-2 h-3 w-3"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1" onClick={onDelete}>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-whiteSmoke text-gray-900' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <FaTrash
                                                className="mr-2 h-3 w-3"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <FaTrash
                                                className="mr-2 h-3 w-3"
                                                aria-hidden="true"
                                            />
                                        )}

                                        Delete
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}


const NoteCard = ({ note, onEdit, onDelete }: {
    note: INote,
    onEdit: (e: React.FormEvent<MouseEvent>, note: INote) => void
    onDelete: (e: React.FormEvent<MouseEvent>, note: INote) => void
}) => {
    return (
        <div key={note._id} className="w-full flex-wrap flex-1 border-b-2 px-2 py-2 my-1 rounded bg-white ">
            <div>
                <div className="">
                    <OptionsMenu
                        onEdit={(e: React.FormEvent<MouseEvent>) => onEdit(e, note)}
                        onDelete={(e: React.FormEvent<MouseEvent>) => onDelete(e, note)}
                    />
                </div>


                <p className="line-clamp-2"> {note.plainText} </p>
            </div>
        </div>
    )
}



const NotesList: FunctionComponent<INoteListProps> = ({ onEditBtnClick, onDeleteClick }) => {

    let { isLoading, data } = useQuery(['notes'], () =>
        getNotesListAPICall(CONNECTION_ID)
    );

    let notes = data?.data?.notes

    if (Object.keys(notes || {}).length <= 0) {
        notes = []
    }

    const handleEditBtnClick = (e: React.FormEvent<MouseEvent>, noteObj: INote) => {
        e.preventDefault();
        const payload = {
            noteObj: noteObj
        }
        onEditBtnClick(payload)
    }
    const handleDeleteBtnClick = (e: React.FormEvent<MouseEvent>, noteObj: INote) => {
        e.preventDefault();

        onDeleteClick(noteObj)
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
                            <NoteCard note={note} key={index} onEdit={handleEditBtnClick} onDelete={handleDeleteBtnClick} />
                        </>

                    )
                })
            }
        </div>
    )
}

export default NotesList