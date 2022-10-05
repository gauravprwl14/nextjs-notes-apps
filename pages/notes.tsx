import { useEffect } from "react";
import type { NextPage } from "next";
import Layout from '../components/Layout'
import SectionLayout from '../components/Page/SectionLayout'
import { FaPlus } from 'react-icons/fa'
import { fetcher, HttpMethods } from '../utils/fetcher'
// import { INote } from "@/types/note";


export { getServerSideProps } from "@/store/notes";


console.log('%c process.env ', 'background: lime; color: black', { env: process.env });


const AddUserButton = () => {
    return (
        <div className="fixed bg-terraCotta rounded-full bottom-3 right-3 p-2 justify-center align-middle flex" >
            <button className="w-full p-2">
                <FaPlus size={20} className="w-full" color="white" />
            </button>
        </div>
    )
}

const Home: NextPage<{}> = ({ }) => {


    // const getUsersDetails = async () => {
    //     try {
    //         const response = await fetcher('/api/users/get', HttpMethods.GET, undefined)
    //     } catch (error) {

    //     }
    // }

    // useEffect(() => {
    //     getUsersDetails()

    // }, [])



    return (
        <div className="w-screen h-max min-h-screen relative">
            <Layout>
                {/* <NoteApp initialNote={initialNote} /> */}
                <SectionLayout />

                <AddUserButton />
            </Layout>
        </div>
    );
};



export default Home;