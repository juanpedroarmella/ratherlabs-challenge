import { StudentRepository } from '@/repository/StudentRepository'
import { NextApiRequest, NextApiResponse } from 'next'
import { RoomRepository } from '@/repository/RoomRepository'
import { RoomService } from '@/service/RoomService'

import sync from '@/db/sync'

const roomsController = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await sync()

  const roomRepository = new RoomRepository()
  const studentRepository = new StudentRepository()
  const roomService = new RoomService(roomRepository, studentRepository)

  res.setHeader('Allow', ['POST', 'GET'])

  if (req.method === 'POST') {
    const { name } = req.body
    try {
      const newRoom = await roomService.createRoom(name)
      res.status(201).json(newRoom)
    } catch (error) {
      if (error.errors[0].type === 'Validation error') {
        res.status(422).json({ message: error.errors[0].message })
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  } else if (req.method === 'GET') {
    try {
      const rooms = await roomService.findAll()

      res.status(200).json(rooms)
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).end()
  }
}

export default roomsController
