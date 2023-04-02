import { StudentRepository } from '@/repository/StudentRepository'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiblingModel } from '@/model/SiblingModel'
import { SiblingRepository } from '@/repository/SiblingRepository'
import { SiblingService } from '@/service/SiblingService'
import sync from '@/db/sync'

const siblingController = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await sync()

  const siblingRepository = new SiblingRepository()
  const studentRepository = new StudentRepository()
  const siblingService = new SiblingService(
    siblingRepository,
    studentRepository
  )

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
      const result: [number] = await siblingService.editOneSibling(
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

export default siblingController
