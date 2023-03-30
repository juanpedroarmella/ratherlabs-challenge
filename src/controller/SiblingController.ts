import { NextApiRequest, NextApiResponse } from 'next'
import { SiblingModel } from '@/model/SiblingModel'
import { SiblingRepository } from '@/repository/SiblingRepository'
import { SiblingService } from '@/service/SiblingService'
import { RoomModel } from '@/model/RoomModel'
import { StudentModel } from '@/model/StudentModel'
import sequelize from '@/db/db'

const siblingRepository = new SiblingRepository()
const siblingService = new SiblingService(siblingRepository)

export default async function siblingController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sequelize.sync()
  sequelize.addModels([StudentModel, RoomModel, SiblingModel])
  if (req.method === 'POST') {
    try {
      const { studentId, siblingId } = req.body
      const sibling: SiblingModel = await siblingService.createSibling(
        studentId,
        siblingId
      )
      res.status(200).json(sibling)
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
  } else if (req.method === 'PUT') {
    try {
      const { studentId, siblingId } = req.body
      const result: [number] = await siblingService.editSibling(
        studentId,
        siblingId
      )
      res.status(200).json(result)
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
  } else if (req.method === 'DELETE') {
    try {
      const { studentId, siblingId } = req.body
      const result: number = await siblingService.deleteSibling(
        studentId,
        siblingId
      )
      res.status(200).json(result)
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
  } else {
    res.status(404).send('Not Found')
  }
}
