import { getToken, JWT } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '@/api-lib/mongo/dbConnect';
import UserModel from '@/api-lib/model/Users'
// import mongoose from 'mongoose';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }



    try {

        await connectToDatabase()

        try {
            const token = await getToken({ req });
            if (!token) {
                res.status(404).json({ message: "Un-Authorized" });
            }

            const uid = token?.uid



            // const user = await db.collection('users').find({
            //     _id: uid
            // })
            const user1 = await UserModel.findOne({ _id: uid }).exec()
            // const user = await db.collection('users').find({})
            res.status(200).json({ uid, user1 });
        } catch (error) {
            console.log('%c  error', 'background: salmon; color: black', { error });
            res.status(500).json(error);
        }


        return res.status(200)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export default get;
