
import { getToken, JWT } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '@/api-lib/mongo/dbConnect';
import { responseHandler } from '@/api-lib/utils/response'
import Logger from '@/api-lib/utils/logger'
import mongoose from 'mongoose';
import { number } from 'zod';



interface IAuthInitialize {
    db: typeof mongoose | null
    token: JWT | null,
    error: {
        status: number;
        payload: Error | any
    } | null
    isError: boolean
}


export const authInitializer = async (req: NextApiRequest, res: NextApiResponse): Promise<IAuthInitialize> => {
    const returnObj: IAuthInitialize = {
        db: null,
        token: null,
        error: {
            status: 500,
            payload: {
                msg: "Server is down. Please try again in sometime"
            }
        },
        isError: true
    }


    try {
        const { db } = await connectToDatabase()
        const token = await getToken({ req });
        if (!db) {
            Logger.error('authInitialize', { msg: "db is not connected", req })


            const payload = {
                message: "Server is down. Please try again in sometime"
            }


            returnObj.error = {
                payload,
                status: 500
            }

            return returnObj
        }
        if (!token) {
            Logger.error('authInitialize', { msg: "token is null", req, })

            const payload = {
                message: `Un-Authorized User`
            }


            returnObj.error = {
                payload,
                status: 401
            }

            return returnObj
        }

        return {
            db,
            token,
            error: null,
            isError: false
        }
    } catch (error) {
        Logger.error('authInitialize', { msg: error, })

        returnObj.error = {
            payload: error,
            status: 500
        }

        return returnObj
    }




}


