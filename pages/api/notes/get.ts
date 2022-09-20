import { getToken, JWT } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '@/api-lib/mongo/dbConnect';
import UserModel from '@/api-lib/model/Users'
import NotesModel from '@/api-lib/model/Notes'
import mongoose from 'mongoose';
import { authInitializer } from '@/api-lib/utils/auth';
import { responseHandler } from '@/api-lib/utils/response';
import { z } from "zod";
import Logger from '@/api-lib/utils/logger';
// import mongoose from 'mongoose';

const getNotesListValidator = z.object({
    data: z.object({
        cid: z.string(),
    })
})


export const getNotesList = async (userId: String, cid: String) => {
    const response = await NotesModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        uid: new mongoose.Types.ObjectId(userId as string),
                    },
                    {
                        "connections.uid": new mongoose.Types.ObjectId(cid as string)
                    },
                ]

            }
        },
        {
            $unwind: "$connections"
        },
        {
            $project: {
                cid: "$connections._id",
                uid: "$uid",
                notes: "$connections.meeting_notes",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt",
            }
        }

    ])

    return response
}




const get = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
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

        const { cid } = req.body?.data


        const response = getNotesList(userId, cid,)

        responseHandler(res, response, 200)
        return


    } catch (error) {
        Logger.error("get.notesList", error)
        let message = "Something went wrong" + error
        if (error instanceof Error) {
            message = error.message
        }

        responseHandler(res, { message: message }, 500)
        return
    }

}

export default get;
