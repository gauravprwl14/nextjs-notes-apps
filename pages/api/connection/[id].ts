
import type { NextApiRequest, NextApiResponse } from 'next'
import NotesModel from '@/api-lib/model/Notes'
import mongoose from 'mongoose';
import { authInitializer } from '@/api-lib/utils/auth';
import { responseHandler } from '@/api-lib/utils/response';
import { z } from "zod";
import Logger from '@/api-lib/utils/logger';

const getConnectionDetailsValidator = z.object({

    id: z.string(),
})


export const getConnectionDetails = async (userId: String, cid: String) => {
    const response = await NotesModel.findOne({
        uid: new mongoose.Types.ObjectId(userId as string),
        "connections.uid": new mongoose.Types.ObjectId(cid as string)
    })

    const transformedConnectionObj = response?.toObject()

    const connectionObj = transformedConnectionObj?.connections[0]
    return connectionObj


    // return response
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
            getConnectionDetailsValidator.parse(req.query)
        } catch (error) {
            const payload = {
                message: error
            }
            responseHandler(res, payload, 400)
            return
        }

        const { id: cid } = req.query as z.infer<typeof getConnectionDetailsValidator>;
        Logger.debug("get connection Details", { cid, userId })


        const response = await getConnectionDetails(userId, cid)

        Logger.debug("get connection Details => response saa s", { response: response[0] })

        responseHandler(res, response, 200)
        return


    } catch (error) {
        Logger.error("get.connectionDetails", error)
        let message = "Something went wrong" + error
        if (error instanceof Error) {
            message = error.message
        }

        responseHandler(res, { message: message }, 500)
        return
    }

}

export default get;
