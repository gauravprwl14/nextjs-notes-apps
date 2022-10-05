
import type { NextPage } from "next";
import Layout from '../components/Layout'
import SectionLayout from '../components/Page/SectionLayout'


const Users: NextPage<{}> = ({ }) => {



    return (
        <div className="w-screen h-max min-h-screen">
            <Layout>
                {/* <NoteApp initialNote={initialNote} /> */}
                User List
            </Layout>
        </div>
    );
};



export default Users;
