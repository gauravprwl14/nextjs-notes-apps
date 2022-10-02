
import type { NextApiRequest, NextApiResponse } from 'next'
import NotesModel from '@/api-lib/model/Notes'
import mongoose from 'mongoose';
import { authInitializer } from '@/api-lib/utils/auth';
import { responseHandler } from '@/api-lib/utils/response';
import { z } from "zod";
import Logger from '@/api-lib/utils/logger';
import { getNotesList } from './get'


const getNotesListValidator = z.object({
    data: z.object({
        cid: z.string(),
        mid: z.string(),
        note: z.any()
    })
})

const update = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        const payload = { message: 'Method not allowed' }
        return responseHandler(res, payload, 405)

    }

    try {
        const { db, token, error, isError } = await authInitializer(req, res);
        if (isError) {
            responseHandler(res, error?.payload || "", error?.status || 500)
        }

        const userId = token?.uid as string

        try {
            getNotesListValidator.parse(req.body)
        } catch (error) {
            const payload = {
                message: error
            }
            responseHandler(res, payload, 400)
            return
        }

        const { cid, note, mid } = req.body?.data


        const notesRecord = await NotesModel.findOneAndUpdate(
            {
                uid: userId
            },
            {
                $set: {
                    "connections.$[cid].meetingNotes.$[mid].note": note,
                    "connections.$[cid].meetingNotes.$[mid].plainText": "random-text",
                }
            },
            {

                "fields": { "_id": 1, "connections": 1 },
                "arrayFilters": [{
                    "cid.uid": cid,

                }, {
                    "mid._id": mid,
                }],
            }
        )
        responseHandler(res, notesRecord, 200)
        return


    } catch (error) {
        Logger.error("update.notesList", error)
        let message = "Something went wrong" + error
        if (error instanceof Error) {
            message = error.message
        }

        responseHandler(res, { message: message }, 500)
        return
    }

}

export default update;