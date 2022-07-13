import { FunctionComponent, useEffect, useState } from "react";
import { fetcher } from "../../utils/fetcher";
import AddNote from "./AddNote";
import NoteTabs from "./NoteTabs";
import NoteList from "./NoteList";
import { Prisma } from "@prisma/client";
import { FilterTab, SavedNoteItem, NoteItem } from "../../types/note";

const NoteApp: FunctionComponent<{ initialNote: SavedNoteItem[] }> = ({
  initialNote,
}) => {
  const [noteList, setNoteList] = useState<SavedNoteItem[]>(initialNote);
  const [showNoteList, setShowNoteList] = useState<SavedNoteItem[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNotes = async () => {
    const newList = await fetch(window.location.origin + "/api/get").then(
      (r) => {
        return r.json();
      }
    );

    console.log('%c newList ', 'background: lime; color: black', { newList, noteList });

    setShowNoteList([...newList.noteList]);
    setLoading(false);
  };

  const updateNoteList = async ({ task, isDone }: NoteItem) => {
    const body: Prisma.NoteListCreateInput = {
      task,
      isDone,
    };

    fetcher("/api/create", { note: body });
    setLoading(true);
    setTimeout(fetchNotes, 1000);
  };

  const deleteNote = ({ id }: { id: number }) => {
    fetcher("/api/deleteNote", { noteId: id, multiple: false });

    setNoteList([...noteList.filter((o: SavedNoteItem) => o.id !== id)]);
  };

  const toggleNote = ({ id, isDone }: { id: number; isDone: boolean }) => {
    fetcher("/api/updateNote", { noteId: id, idDoneVal: !isDone });

    setLoading(true);
    setTimeout(fetchNotes, 1000);
    setLoading(false);
  };

  const clearAllCompleted = () => {
    fetcher("/api/deleteNote", { multiple: true });

    setNoteList([...noteList.filter((o: SavedNoteItem) => o.isDone !== true)]);
  };

  const changeActiveTab = (tab: FilterTab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    console.log('%c noteList ', 'background: lime; color: black', { noteList });

    switch (activeTab) {
      case "active":
        setShowNoteList([
          ...noteList.filter((o: SavedNoteItem) => o.isDone === false),
        ]);
        break;
      case "completed":
        setShowNoteList([
          ...noteList.filter((o: SavedNoteItem) => o.isDone === true),
        ]);
        break;
      default:
        setShowNoteList([...noteList]);
    }
  }, [noteList, activeTab]);

  return (
    <>
      <div>
        <AddNote updateNoteList={updateNoteList} />
      </div>
      <div>
        <NoteTabs activeTab={activeTab} changeActiveTab={changeActiveTab} />
      </div>
      <div>
        <NoteList
          loading={loading}
          noteList={showNoteList}
          deleteNote={deleteNote}
          toggleNote={toggleNote}
          clearAllCompleted={clearAllCompleted}
        />
      </div>
    </>
  );
};

export default NoteApp;
