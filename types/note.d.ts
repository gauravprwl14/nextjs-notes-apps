export interface INote {
    _id: number;
    note: Descendant[] | [];
    plainText: string | null
    createdAt: any;
    updatedAt: any;
}

export interface IConnection {
    _id: number;
    name: String;
    uid: number;
    personnel_note: INote,
    meeting_notes: INote[]
}
export interface INotes {
    _id: number;
    uid: number;
    personnel_note: INote,
    connections: IConnection[]
}





export type ISlateNote = Descendant[] | [];

export interface INoteEditFnHandler {
    note: INote;
    event: React.FormEvent<MouseEvent>
}















// export type DeleteNoteBodyParams = {
//     multiple: boolean,
//     noteId?: number
// }

// export type UpdateNoteBodyParams = {
//     noteId: number,
//     idDoneVal: boolean,
// }

// export type CreateNoteBodyParams = {
//     note: {
//         task: string,
//         isDone: boolean
//     },
// }

// export interface NoteItem {
//     task: string,
//     isDone: boolean
// }

// export interface SavedNoteItem extends NoteItem {
//     id: number
// }

// type deleteNote = ({ id: number }) => void;
// type toggleNote = ({ id: number, isDone: boolean }) => void
// type clearAllCompleted = () => void
// export interface NoteItemComponentProps extends SavedNoteItem {
//     deleteNote: deleteNote,
//     toggleNote: toggleNote,
// }

// export interface NoteListComponentProps {
//     loading: boolean,
//     noteList: SavedNoteItem[],
//     deleteNote: deleteNote,
//     toggleNote: toggleNote,
//     clearAllCompleted: clearAllCompleted,
// }

// export type FilterTab = "all" | "active" | "completed"