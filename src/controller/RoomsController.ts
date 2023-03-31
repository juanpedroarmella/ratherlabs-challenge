import { StudentRepository } from '@/repository/StudentRepository'
import { NextApiRequest, NextApiResponse } from 'next'
import { RoomRepository } from '@/repository/RoomRepository'
import { RoomService } from '@/service/RoomService'
import sequelize from '@/db/db'
import { RoomModel } from '@/model/RoomModel'
import { SiblingModel } from '@/model/SiblingModel'
import { StudentModel } from '@/model/StudentModel'

export default async function roomsController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sequelize.sync()
  sequelize.addModels([StudentModel, RoomModel, SiblingModel])

  const roomRepository = new RoomRepository()
  const studentRepository = new StudentRepository()
  const roomService = new RoomService(roomRepository, studentRepository)

  if (req.method === 'POST') {
    const { name } = req.body
    try {
      const newRoom = await roomService.createRoom(name)
      res.status(201).json(newRoom)
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
