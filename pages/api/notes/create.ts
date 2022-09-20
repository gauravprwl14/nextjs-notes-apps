import type { NextApiRequest, NextApiResponse } from 'next'
import { authInitializer } from '@/api-lib/utils/auth';
import { getToken } from 'next-auth/jwt';
import { responseHandler } from '@/api-lib/utils/response';
import NotesModel from '@/api-lib/model/Notes';
import { z } from "zod";
import {

    Descendant,
} from 'slate'
import Logger from '@/api-lib/utils/logger';
import mongoose from 'mongoose';


const addNotesValidator = z.object({
    data: z.object({
        cid: z.string(),
        note: z.any()
    })
})




const create = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { data } = req.body
        const { db, token, error, isError } = await authInitializer(req, res);

        if (isError) {
            responseHandler(res, error?.payload || "", error?.status || 500)
        }

        const userId = token?.uid

        try {
            addNotesValidator.parse(req.body)
        } catch (error) {
            const payload = {
                message: error
            }
            responseHandler(res, payload, 400)
            return
        }

        const { cid, note } = data



        try {
            // const userNotesResponse = await NotesModel.findOne({
            //     $and: [
            //         {
            //             uid: userId
            //         },
            //         {
            //             'connections.uid': cid
            //         }
            //     ]

            // })
            const userNotesResponse = await NotesModel.findOne({
                uid: userId
            })



            if (!userNotesResponse) {

                const response = await NotesModel.create({
                    uid: userId,
                    connections: [{
                        name: "test-user",
                        uid: cid,
                        meeting_notes: [
                            {
                                note: note,
                                plain_text: "random-string"
                            }
                        ]

                    }]
                })

                responseHandler(res, response, 200)
                return
            } else {


                //  add any notes

                // const response = await NotesModel.findOneAndUpdate(
                //     {
                //         uid: userId
                //     },
                //     {
                //         $push: {
                //             "connections.$[cid].meeting_notes": {
                //                 note: note,
                //                 plain_text: "random-text"
                //             }
                //         }
                //     },
                //     {
                //         "arrayFilters": [{
                //             "cid.uid": cid
                //         }],
                //         new: true

                //     }
                // )


                //  update any notes

                // const notesRecord = await NotesModel.findOneAndUpdate(
                //     {
                //         uid: userId
                //     },
                //     {
                //         $set: {
                //             "connections.$[cid].meeting_notes.$[mid].note": note,
                //             "connections.$[cid].meeting_notes.$[mid].plain_text": "random-text",
                //         }
                //     },
                //     {

                //         "fields": { "_id": 1, "connections": 1 },
                //         "arrayFilters": [{
                //             "cid.uid": cid,

                //         }, {
                //             "mid._id": "6326bfc5923e98b1f78b9d9f",
                //         }],
                //     }
                // )


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

                Logger.debug('notes create', response)





                responseHandler(res, response, 200)
                return

            }



        } catch (error) {
            Logger.error("create.notes", error)
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