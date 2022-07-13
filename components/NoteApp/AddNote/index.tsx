import { FunctionComponent, useState } from "react";
import { NoteItem } from "../../../types/note";

interface Props {
  updateNoteList: ({ task, isDone }: NoteItem) => void;
}

const AddNote: FunctionComponent<Props> = ({ updateNoteList }) => {
  const [task, setTask] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);

  const saveNote = () => {
    if (task != "") updateNoteList({ task, isDone });
    setTask("");
    setIsDone(false);
  };

  return (
    <div className="h-16 w-1/3 bg-white flex rounded-md mx-auto mt-6 items-center justify-between">
      <div>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => setIsDone(!isDone)}
          className="ml-3 mt-1 h-5 w-5 checked:bg-blue-500"
        />
      </div>
      <div className="w-4/5 h-3/4 p-0 bg-white border-transparent border-2 border-b-emerald-500 text-sm shadow-sm placeholder-slate-400">
        <input
          type="text"
          placeholder="Add ..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full h-full focus:outline-none"
        />
      </div>
      <button
        onClick={saveNote}
        className="bg-cyan-800 rounded-lg mr-2 text-white h-9 w-9"
      >
        +
      </button>
    </div>
  );
};

export default AddNote;
