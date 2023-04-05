import { RoomRepository } from '@/repository/RoomRepository'
import sync from '@/db/sync'
import { SiblingRepository } from '@/repository/SiblingRepository'
import { StudentRepository } from '@/repository/StudentRepository'
import { SiblingService } from '@/service/SiblingService'
import { StudentService } from '@/service/StudentService'
import { NextApiRequest, NextApiResponse } from 'next'
import handlePutStudent from './handlers/handlePutStudent'
import { RoomService } from '@/service/RoomService'

const studentController = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await sync()

  const siblingRepository = new SiblingRepository()

  const studentRepository = new StudentRepository()

  const roomService = new RoomService(new RoomRepository(), studentRepository)

  const siblingService = new SiblingService(
    siblingRepository,
    studentRepository
  )

  const studentService = new StudentService(
    studentRepository,
    siblingService,
    roomService
  )

  switch (req.method) {
    case 'PUT': {
      await handlePutStudent(req, res, studentService)
      break
    }
    case 'GET': {
      try {
        const id = parseInt(req.query.id as string)

        if (Number.isNaN(id)) {
          const errorMessage = `Invalid id: ${req.query.id as string}`
          res.status(400).end(errorMessage)
        }

        const student = await studentService.getStudentById(id)

        student != null ? res.status(200).json(student) : res.status(404).end()
      } catch (error) {
        res.status(500).end('Internal server error')
      }
      break
    }
    case 'DELETE': {
      const id = parseInt(req.query.id as string)
      try {
        const deletedCount = await studentService.deleteStudent(id)
        if (deletedCount === 0) {
          res.status(404).end()
        } else {
          res.status(200).json({ deletedCount })
        }
      } catch (e) {
        res.status(500).end('Internal server error')
      }
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end('Method not allowed')
  }
}

export default studentController
