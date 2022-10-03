import { Node, Element } from 'slate'

export const serializeNote = (nodesArr: Element[]) => {
    return nodesArr.map((n: Element) => Node.string(n)).join('\n')
}


export const generateResponseForPostNoteApi = (response: any) => {
    const { _doc } = response

    const connectionObject = _doc.connections[0]

    const meetingNotes = connectionObject?.meetingNotes[connectionObject.meetingNotes.length - 1]?.toObject()

    return meetingNotes
}