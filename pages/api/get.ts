import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prisma"

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const noteList = await prisma.noteList.findMany({
      orderBy: [
        {
          isDone: 'asc'
        },
        {
          id: 'desc'
        }
      ]
    });

    return res.status(200).json({ noteList })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}

export default get;