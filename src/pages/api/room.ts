import roomController from '@/controller/RoomController'
import sequelize from '@/db/db'
import { RoomModel } from '@/model/RoomModel'
import { SiblingModel } from '@/model/SiblingModel'
import { StudentModel } from '@/model/StudentModel'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sequelize.sync()
  await sequelize.addModels([StudentModel, RoomModel, SiblingModel])
  return roomController(req, res)
}
