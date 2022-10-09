
import type { NextApiRequest, NextApiResponse } from 'next'
import NotesModel from '@/api-lib/model/Notes'
import mongoose from 'mongoose';
import { authInitializer } from '@/api-lib/utils/auth';
import { responseHandler } from '@/api-lib/utils/response';
import { z } from "zod";
import Logger from '@/api-lib/utils/logger';

const getNotesListValidator = z.object({

    cid: z.string(),
})

// msg: {
//      cid: '631c6d4b2e19c822dd05c8c2',
//     userId: '633294e0f9099ce610bfd571'
//     }


export const getNotesList = async (userId: String, cid: String) => {
    const response = await NotesModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        uid: new mongoose.Types.ObjectId(userId as string),
                    },
                    {
                        "connections._id": new mongoose.Types.ObjectId(cid as string)
                    },
                ]

            }
        },
        {
            $unwind: "$connections"
        },

        {
            $match: {
                "connections._id": new mongoose.Types.ObjectId(cid as string)
            }
        },

        {
            $project: {
                notes: "$connections.meetingNotes",

            }
        },
        {
            $unwind: {
                path: "$notes",
            }
        },
        {
            $sort: {
                "notes.updatedAt": -1
            }
        },
        {
            $group: {
                _id: "$_id",
                notes: {
                    $push: "$notes"
                }
            }
        }
        // {
        //     $unwind: "$meetingNotes"
        // },
        // {
        //     $sort: {
        //         "connections.meetingNotes.updatedAt": -1
        //     }
        // },

        // {
        //     $unwind: "$connections.meetingNotes"
        // },
        // {
        //     $project: {
        //         meetingNotes: "$connections.meetingNotes",
        //         _id: 0
        //     }
        // },
        // {
        //     $sort: {
        //         "connections.meetingNotes.updatedAt": -1
        //     }
        // },

        // {
        //     $group: {
        //         _id: "$connections._id",


        //         uid: { $first: '$uid' },
        //         cid: { $first: '$connections._id' },
        //         name: { $first: '$connections.name' },
        //         createdAt: { $first: '$createdAt' },
        //         updatedAt: { $first: '$updatedAt' },
        //         __v: { $first: '$__v' },



        //         "notes": {
        //             "$push": "$connections.meetingNotes",
        //         }

        //     }
        // },

        // {
        //     $project: {
        //         cid: "$connections._id",
        //         uid: "$uid",
        //         notes: "$connections.meetingNotes",

        //     }
        // }

    ])


    return response[0]

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
            getNotesListValidator.parse(req.query)
        } catch (error) {
            const payload = {
                message: error
            }
            responseHandler(res, payload, 400)
            return
        }

        const { cid } = req.query as z.infer<typeof getNotesListValidator>;
        Logger.debug("get function note", { cid, userId })


        const response = await getNotesList(userId, cid)

        Logger.debug("get function note => response saa s", { response: response })

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
