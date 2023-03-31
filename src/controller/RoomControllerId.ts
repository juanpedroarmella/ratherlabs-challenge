import sequelize from '@/db/db'
import { RoomModel } from '@/model/RoomModel'
import { SiblingModel } from '@/model/SiblingModel'
import { StudentModel } from '@/model/StudentModel'
import { RoomRepository } from '@/repository/RoomRepository'
import { StudentRepository } from '@/repository/StudentRepository'
import { RoomService } from '@/service/RoomService'
import { NextApiRequest, NextApiResponse } from 'next'

const roomRepository = new RoomRepository()
const studentRepository = new StudentRepository()
const roomService = new RoomService(roomRepository, studentRepository)

export default async function roomControllerId (
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sequelize.sync()
  sequelize.addModels([StudentModel, RoomModel, SiblingModel])
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
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'GET') {
    const id = parseInt(req.query.id as string)

    try {
      const room = await roomService.findRoom(id)
      if (room) {
        res.status(200).json(room)
      } else {
        res.status(404).end()
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).end()
  }
}
