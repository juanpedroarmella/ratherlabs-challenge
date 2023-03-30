import { NextApiRequest, NextApiResponse } from 'next'
import { RoomRepository } from '@/repository/RoomRepository'
import { RoomService } from '@/service/RoomService'
import sequelize from '@/db/db'
import { RoomModel } from '@/model/RoomModel'
import { SiblingModel } from '@/model/SiblingModel'
import { StudentModel } from '@/model/StudentModel'

const roomRepository = new RoomRepository()
const roomService = new RoomService(roomRepository)

export default async function roomController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sequelize.sync()
  sequelize.addModels([StudentModel, RoomModel, SiblingModel])

  console.log(sequelize)

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
