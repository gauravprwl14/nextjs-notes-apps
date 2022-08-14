import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from "../../lib/prisma"

const deleteNote = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { multiple } = req.body

    let deletedNote = null;
    // if (multiple) {
    //   deletedNote = await prisma.noteList.deleteMany({
    //     where: {
    //       isDone: true,
    //     },
    //   })
    // }
    // else {
    //   const { noteId } = req.body;
    //   deletedNote = await prisma.noteList.delete({
    //     where: {
    //       id: noteId,
    //     },
    //   })
    // }

    // res.status(200).json({ deletedNote })
    res.status(200)
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}

export default deleteNote;