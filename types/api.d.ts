export interface IResponsePayload<T> {
    data: T;
    isError: boolean,
    status: number
}
export interface IPostNoteApiCallPayload {
    data: {
        note: ISlateNote;
        cid: String;
    }
}

export interface IUpdateNoteApiCallPayload {
    data: {
        note: ISlateNote;
        cid: String;
        nodeId: number
    }
}

export interface IDeleteNoteApiCallPayload {
    data: {
        cid: String;
        nodeId: number
    }
}


export interface IUpdateConnectionNoteApiCallPayload {
    data: {
        note: ISlateNote;
        cid: String;
    }
}


export interface IUpdateUserNoteApiCallPayload {
    data: {
        note: ISlateNote;
    }
}