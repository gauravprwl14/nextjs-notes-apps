import type { NextPage } from "next";
import NoteApp from "../components/NoteApp";
import prisma from "../lib/prisma";
import { SavedNoteItem } from "../types/note";

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
    <div className="w-screen h-max min-h-screen from-[#0f2027] via-[#203a43] to-[#2c5364] bg-gradient-to-r absolute">
      <div className="h-16 w-1/3 flex rounded-md mx-auto mt-20 items-center justify-between text-white">
        <div className="text-4xl font-semibold">Notes App</div>
        <div className="">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 bg-red"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg> */}
        </div>
      </div>
      {/* @ts-ignore */}
      <NoteApp initialNote={initialNote} />
    </div>
  );
};

export default Home;
