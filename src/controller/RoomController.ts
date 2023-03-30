import { NextApiRequest, NextApiResponse } from 'next'
import { RoomRepository } from '@/repository/RoomRepository'
import { RoomService } from '@/service/RoomService'

const roomRepository = new RoomRepository()
const roomService = new RoomService(roomRepository)

export default async function roomController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name } = req.body

    try {
      const newRoom = await roomService.createRoom(name)
      res.status(201).json(newRoom)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'PUT') {
    const { id, name } = req.body

    try {
      const [updatedRows] = await roomService.editRoom(id, name)

      if (updatedRows === 0) {
        res.status(404).end()
      } else {
        res.status(204).end()
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'GET') {
    try {
      const room = await roomService.findAll()

      res.status(200).json(room)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).end()
  }
}
