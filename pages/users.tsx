
import type { NextPage } from "next";
import Layout from '../components/Layout'
import SectionLayout from '../components/Page/SectionLayout'


const Users: NextPage<{}> = ({ }) => {



    return (
        <div className="w-screen h-max min-h-screen">
            <Layout>
                {/* <NoteApp initialNote={initialNote} /> */}
                User List

                <table className="w-full my-8 border-separate table-spacing text-gray-600">
                    <thead>
                        <tr>
                            <th className="rounded-l-xl">Profile Icon</th>
                            <th className="rounded-l-xl">User Name</th>
                            <th className="rounded-r-xl">Action</th>
                        </tr>
                    </thead>
                </table>
            </Layout>
        </div>
    );
};



export default Users;
