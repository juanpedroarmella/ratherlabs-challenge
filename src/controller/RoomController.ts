import sync from '@/db/sync'
import { RoomRepository } from '@/repository/RoomRepository'
import { StudentRepository } from '@/repository/StudentRepository'
import { RoomService } from '@/service/RoomService'
import { NextApiRequest, NextApiResponse } from 'next'
import handleUpdateErrors from './handlers/handleUpdateErrors'

const roomControllerId = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await sync()

  const roomRepository = new RoomRepository()
  const studentRepository = new StudentRepository()
  const roomService = new RoomService(roomRepository, studentRepository)

  res.setHeader('Allow', ['PUT', 'GET'])

  if (req.method === 'PUT') {
    const id = parseInt(req.query.id as string)
    const { name } = req.body

    try {
      const [updatedRows] = await roomService.editRoom(id, name)

      if (updatedRows === 0) {
        res.status(404).end()
      } else {
        res.status(200).json({ updatedRows })
      }
    } catch (error) {
      handleUpdateErrors(error, res)
    }
  } else if (req.method === 'GET') {
    const id = parseInt(req.query.id as string)

    try {
      const room = await roomService.findRoom(id)
      if (room != null) {
        res.status(200).json(room)
      } else {
        res.status(404).end()
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
  if (req.method === 'DELETE') {
    const id = parseInt(req.query.id as string)
    try {
      const deletedCount = await roomService.deleteRoom(id)
      if (deletedCount === 0) {
        res.status(404).end()
      } else {
        res.status(200).json({ deletedCount })
      }
    } catch (e) {
      res.status(500).end('Internal server error')
    }
  } else {
    res.status(405).end()
  }
}

export default roomControllerId
