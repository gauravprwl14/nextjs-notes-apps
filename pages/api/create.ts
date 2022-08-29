import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from "../../lib/prisma"
import connectToDatabase from '@/api-lib/dbConnect';


const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { note } = req.body

    const dbInstance = await connectToDatabase()
    console.log('%c dbInstance ', 'background: lime; color: black', { dbInstance });
    // const savednote = await prisma.noteList.create({
    //   data: note
    // })

    // res.status(200).json({ savednote })
    res.status(200)
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong', error });
  }
}

export default create;