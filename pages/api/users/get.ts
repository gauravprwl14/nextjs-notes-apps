
import type { NextApiRequest, NextApiResponse } from 'next'
import NotesModel from '@/api-lib/model/Notes'
import mongoose from 'mongoose';
import { authInitializer } from '@/api-lib/utils/auth';
import { responseHandler } from '@/api-lib/utils/response';
import { z } from "zod";
import Logger from '@/api-lib/utils/logger';


export const getUsersDetails = async (userId: String) => {
    const response = await NotesModel.findOne({
        uid: new mongoose.Types.ObjectId(userId as string),
    }, "uid personnelNote _id createdAt updatedAT __v")


    const transformedConnectionObj = response?.toObject()


    const connectionObj = transformedConnectionObj
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
            return responseHandler(res, error?.payload || "", error?.status || 500)
        }

        const userId = token?.uid as string




        const response = await getUsersDetails(userId)

        Logger.debug("get getUsersDetails => response saa s", { response: response })

        responseHandler(res, response, 200)
        return


    } catch (error) {
        Logger.error("get.getUsersDetails", error)
        let message = "Something went wrong" + error
        if (error instanceof Error) {
            message = error.message
        }

        responseHandler(res, { message: message }, 500)
        return
    }

}

export default get;
