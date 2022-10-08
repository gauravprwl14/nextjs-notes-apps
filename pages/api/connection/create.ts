import type { NextApiRequest, NextApiResponse } from 'next'
import { authInitializer } from '@/api-lib/utils/auth';
import { responseHandler } from '@/api-lib/utils/response';
import NotesModel from '@/api-lib/model/Notes';
import { z } from "zod";
import { Node, Element } from 'slate'
import Logger from '@/api-lib/utils/logger';
import mongoose from 'mongoose';
import { generateResponseForPostNoteApi, serializeNote } from '@/api-lib/utils/helper';


const addConnectionValidator = z.object({
    data: z.object({
        // name: z.string(),
        connectionDetails: z.object({
            name: z.string(),
        })

    })
})








const create = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        const payload = { message: 'Method not allowed' }
        return responseHandler(res, payload, 405)
    }

    try {
        const { data } = req.body
        const { db, token, error, isError } = await authInitializer(req, res);

        if (isError) {
            responseHandler(res, error?.payload || "", error?.status || 500)
        }

        const userId = token?.uid

        try {
            addConnectionValidator.parse(req.body)
        } catch (error) {
            const payload = {
                message: error
            }
            responseHandler(res, payload, 400)
            return
        }
        const { connectionDetails } = data

        const { name } = connectionDetails


        try {

            const userConnectionResponse = await NotesModel.findOneAndUpdate({
                uid: userId
            }, {
                $push: {
                    "connections": {
                        name: name
                    }
                }
            }, {

                new: true,
                runValidators: true,
            })


            responseHandler(res, userConnectionResponse, 200)



            // if (!userNotesResponse) {

            //     const response = await NotesModel.create({
            //         uid: userId,
            //         connections: [{
            //             name: "test-user",
            //             uid: cid,
            //             meetingNotes: [
            //                 {
            //                     note: note,
            //                     plainText: plainText
            //                 }
            //             ]

            //         }]
            //     })

            //     responseHandler(res, response, 200)
            //     return
            // } else {


            //     //  add any notes

            //     const response = await NotesModel.findOneAndUpdate(
            //         {
            //             uid: userId
            //         },
            //         {
            //             $push: {
            //                 "connections.$[cid].meetingNotes": {
            //                     note: note,
            //                     plainText: plainText
            //                 }
            //             }
            //         },
            //         {
            //             "arrayFilters": [{
            //                 "cid.uid": cid
            //             }],

            //             new: true,
            //             runValidators: true,
            //             fields: {
            //                 connections: {
            //                     $elemMatch: {
            //                         "uid": cid,
            //                     },

            //                 }
            //                 // "connections": 1
            //             }

            //         }
            //     )




            //     const meetingNotes = generateResponseForPostNoteApi(response)


            //     Logger.debug('notes create', meetingNotes)





            //     responseHandler(res, meetingNotes, 200)
            //     return

            // }



        } catch (error) {
            Logger.error("create.connections", error)
            let message = "Something went wrong" + error
            if (error instanceof Error) {
                message = error.message
            }

            responseHandler(res, { message: message }, 500)
            return
        }

    } catch (error) {
        // res.status(400).json({ message: 'Something went wrong', error });
        responseHandler(res, error, 500)
    }
}

export default create;