import { useEffect } from "react";
import type { NextPage } from "next";
import Layout from '../components/Layout'
import SectionLayout from '../components/Page/SectionLayout'
import { FaPlus } from 'react-icons/fa'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Loader from '@/components/Loader'
import { useNotesController } from '@/store/notes'
import Button from '@/components/Button'
// import { INote } from "@/types/note";


export { getServerSideProps } from "@/store/notes";



const AddUserButton = ({ onBtnClick }: { onBtnClick: () => void }) => {
    return (
        <div className="fixed bg-terraCotta rounded-full bottom-3 right-3 p-2 justify-center align-middle flex"
            onClick={onBtnClick}
        >
            <button className="w-full p-2">
                <FaPlus size={20} className="w-full" color="white" />
            </button>
        </div>
    )
}


const AddUserModal = ({ isOpen, closeModal, openModal, title, updateConnectionDetails, isLoading, onAddNewConnectionClick }: any) => {



    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            openModal={openModal}
            title={title}
        >
            <div className="mt-2">
                <Input
                    placeholder="Add Unique User.."
                    label=""
                    type="text"
                    className="p-2"
                    onChange={updateConnectionDetails}
                />
            </div>

            <div className="mt-4">
                <div className="w-auto inline-block float-right">
                    <Button
                        layoutClass=""
                        btnClass="flex"
                        onClick={onAddNewConnectionClick}
                        enableLoader
                        isLoading={isLoading}
                    >
                        Add User
                    </Button>
                </div>


                {/* <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                >
                    Add
                </button> */}
            </div>
        </Modal>
    )
}

const Home: NextPage<{}> = ({ }) => {
    const { closeModal, openModal, isOpen, updateConnectionDetails, resetConnectionDetails, connectionDetails, addNewConnectionMutation, handleAddNewConnectionBtnClick } = useNotesController()


    console.log('%c addNewConnectionMutation ', 'background: lime; color: black', { addNewConnectionMutation, status: addNewConnectionMutation.status });

    const handleAddBtnClick = () => {
        if (!isOpen) {
            openModal()
            resetConnectionDetails()

        }
    }

    const handleConnectionDetailsChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget

        updateConnectionDetails({
            _id: null,
            name: value
        })
    }

    const handleAddNewConnection = () => {
        handleAddNewConnectionBtnClick(connectionDetails)
    }

    return (
        <div className="w-screen h-max min-h-screen relative">
            <Layout>
                {/* <NoteApp initialNote={initialNote} /> */}
                <SectionLayout />

                <AddUserButton
                    onBtnClick={handleAddBtnClick}
                />
                <AddUserModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    openModal={openModal}
                    title="Add User"
                    updateConnectionDetails={handleConnectionDetailsChange}
                    isLoading={addNewConnectionMutation?.isLoading}
                    onAddNewConnectionClick={handleAddNewConnection}
                />

            </Layout>
        </div>
    );
};



export default Home;