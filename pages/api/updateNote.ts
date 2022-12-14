import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from "../../lib/prisma"

const updateNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // const { noteId, idDoneVal } = req.body;

    // const updatedNote = await prisma.noteList.update({
    //   where: {
    //     id: noteId,
    //   },
    //   data: {
    //     isDone: idDoneVal
    //   }
    // })

    // res.status(200).json({ updatedNote });
    res.status(200)
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}

export default updateNotes;