export type DeleteNoteBodyParams = {
    multiple: boolean,
    noteId?: number
}

export type UpdateNoteBodyParams = {
    noteId: number,
    idDoneVal: boolean,
}

export type CreateNoteBodyParams = {
    note: {
        task: string,
        isDone: boolean
    },
}

export interface NoteItem {
    task: string,
    isDone: boolean
}

export interface SavedNoteItem extends NoteItem {
    id: number
}

type deleteNote = ({ id: number }) => void;
type toggleNote = ({ id: number, isDone: boolean }) => void
type clearAllCompleted = () => void
export interface NoteItemComponentProps extends SavedNoteItem {
    deleteNote: deleteNote,
    toggleNote: toggleNote,
}

export interface NoteListComponentProps {
    loading: boolean,
    noteList: SavedNoteItem[],
    deleteNote: deleteNote,
    toggleNote: toggleNote,
    clearAllCompleted: clearAllCompleted,
}

export type FilterTab = "all" | "active" | "completed"