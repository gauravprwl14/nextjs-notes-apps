
import type { NextApiRequest, NextApiResponse } from 'next'
import NotesModel from '@/api-lib/model/Notes'
import mongoose from 'mongoose';
import { authInitializer } from '@/api-lib/utils/auth';
import { responseHandler } from '@/api-lib/utils/response';
import { z } from "zod";
import Logger from '@/api-lib/utils/logger';

// const getNotesListValidator = z.object({

//     cid: z.string(),
// })

// msg: {
//      cid: '631c6d4b2e19c822dd05c8c2',
//     userId: '633294e0f9099ce610bfd571'
//     }


export const getConnectionList = async (userId: String) => {



    const response = await NotesModel.aggregate([
        {
            $match: {
                uid: new mongoose.Types.ObjectId(userId as string),
            }
        },
        {
            $project: { "connections.personnelNote": false, "connections.meetingNotes": false, }
        },
        {
            $sort: {
                "connections.updatedAt": -1
            }
        },
        {
            $project: {
                "connections": true,
                _id: false
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

        // try {
        //     getNotesListValidator.parse(req.query)
        // } catch (error) {
        //     const payload = {
        //         message: error
        //     }
        //     responseHandler(res, payload, 400)
        //     return
        // }

        // const { cid } = req.query as z.infer<typeof getNotesListValidator>;
        // Logger.debug("get function note", { cid, userId })


        const response = await getConnectionList(userId)

        Logger.debug("get function note => response saa s", { response: response[0] })

        responseHandler(res, response[0], 200)
        return


    } catch (error) {
        Logger.error("get.connectionList", error)
        let message = "Something went wrong" + error
        if (error instanceof Error) {
            message = error.message
        }

        responseHandler(res, { message: message }, 500)
        return
    }

}

export default get;
