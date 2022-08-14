import type { NextPage } from "next";
import { SavedNoteItem } from "../types/note";
import Layout from '../components/Layout'
import SectionLayout from '../components/Common/SectionLayout'


const Home: NextPage<{ initialNote: SavedNoteItem[] }> = ({ initialNote }) => {
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
