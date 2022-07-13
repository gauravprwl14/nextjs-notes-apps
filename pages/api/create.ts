import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prisma"

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { note } = req.body

    const savednote = await prisma.noteList.create({
      data: note
    })

    res.status(200).json({ savednote })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}

export default create;