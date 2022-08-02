import type { NextPage } from "next";
import NoteApp from "../components/NoteApp";
import prisma from "../lib/prisma";
import { SavedNoteItem } from "../types/note";
import Layout from '../components/Layout'
import SectionLayout from '../components/Common/SectionLayout'


export async function getServerSideProps() {
  const newList: SavedNoteItem[] = await prisma.noteList.findMany({
    orderBy: [
      {
        isDone: "asc",
      },
      {
        id: "desc",
      },
    ],
  });
  return {
    props: { initialNote: newList },
  };
}

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
