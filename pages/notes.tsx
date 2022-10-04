import { useEffect } from "react";
import type { NextPage } from "next";
import Layout from '../components/Layout'
import SectionLayout from '../components/Page/SectionLayout'
import { fetcher, HttpMethods } from '../utils/fetcher'
// import { INote } from "@/types/note";


export { getServerSideProps } from "@/store/notes";


console.log('%c process.env ', 'background: lime; color: black', { env: process.env });

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
        <div className="w-screen h-max min-h-screen">
            <Layout>
                {/* <NoteApp initialNote={initialNote} /> */}
                <SectionLayout />
            </Layout>
        </div>
    );
};



export default Home;
