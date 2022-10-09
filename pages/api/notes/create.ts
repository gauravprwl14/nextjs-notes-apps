import type { NextApiRequest, NextApiResponse } from 'next'
import { authInitializer } from '@/api-lib/utils/auth';
import { getToken } from 'next-auth/jwt';
import { responseHandler } from '@/api-lib/utils/response';
import NotesModel from '@/api-lib/model/Notes';
import { z } from "zod";
import { Node, Element } from 'slate'
import Logger from '@/api-lib/utils/logger';
import mongoose from 'mongoose';
import { generateResponseForPostNoteApi, serializeNote } from '@/api-lib/utils/helper';


const addNotesValidator = z.object({
    data: z.object({
        cid: z.string(),
        note: z.any()
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
            addNotesValidator.parse(req.body)
        } catch (error) {
            const payload = {
                message: error
            }
            responseHandler(res, payload, 400)
            return
        }

        const { cid, note } = data
        const plainText = serializeNote(note)


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
                        meetingNotes: [
                            {
                                note: note,
                                plainText: plainText
                            }
                        ]

                    }]
                })

                responseHandler(res, response, 200)
                return
            } else {


                //  add any notes

                const response = await NotesModel.findOneAndUpdate(
                    {
                        uid: userId
                    },
                    {
                        $push: {
                            "connections.$[cid].meetingNotes": {
                                note: note,
                                plainText: plainText
                            }
                        }
                    },
                    {
                        "arrayFilters": [{
                            "cid._id": cid
                        }],

                        new: true,
                        runValidators: true,
                        fields: {
                            connections: {
                                $elemMatch: {
                                    "_id": new mongoose.Types.ObjectId(cid as string),
                                },

                            }
                            // "connections": 1
                        }

                    }
                )




                const meetingNotes = generateResponseForPostNoteApi(response)



                //  update any notes

                // const notesRecord = await NotesModel.findOneAndUpdate(
                //     {
                //         uid: userId
                //     },
                //     {
                //         $set: {
                //             "connections.$[cid].meetingNotes.$[mid].note": note,
                //             "connections.$[cid].meetingNotes.$[mid].plainText": plainText,
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

                // Get Notes List
                // const response = await NotesModel.aggregate([
                //     {
                //         $match: {
                //             $and: [
                //                 {
                //                     uid: new mongoose.Types.ObjectId(userId as string),
                //                 },
                //                 {
                //                     "connections.uid": new mongoose.Types.ObjectId(cid as string)
                //                 },
                //             ]

                //         }
                //     },
                //     {
                //         $unwind: "$connections"
                //     },
                //     {
                //         $project: {
                //             cid: "$connections._id",
                //             uid: "$uid",
                //             notes: "$connections.meetingNotes",
                //             createdAt: "$createdAt",
                //             updatedAt: "$updatedAt",
                //         }
                //     }

                // ])

                Logger.debug('notes create', meetingNotes)





                responseHandler(res, meetingNotes, 200)
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