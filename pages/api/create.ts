import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from "../../lib/prisma"
import connectToDatabase from '@/api-lib/mongo/dbConnect';


const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { note } = req.body

    const { db } = await connectToDatabase()
    try {
      // const user = await db.collection('users')
      res.status(200).json({
        user: {
          test: "test-user"
        }
      });
    } catch (error) {
      res.status(404).json(error);
    }


    console.log('%c dbInstance ', 'background: lime; color: black', { db });

    // res.status(200).json({ savednote })
    res.status(200)
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong', error });
  }
}

export default create;