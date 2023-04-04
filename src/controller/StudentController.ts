import sync from '@/db/sync'
import { SiblingRepository } from '@/repository/SiblingRepository'
import { StudentRepository } from '@/repository/StudentRepository'
import { SiblingService } from '@/service/SiblingService'
import { StudentService } from '@/service/StudentService'
import { NextApiRequest, NextApiResponse } from 'next'

const studentController = async (
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

  const studentService = new StudentService(studentRepository, siblingService)

  switch (req.method) {
    case 'PUT': {
      try {
        const id = parseInt(req.query.id as string)
        const { name, age, gender, roomId, siblings } = req.body
        if (Number.isNaN(id)) {
          throw new Error('Invalid id')
        }
        const studentAffected = await studentService.editStudent(
          id,
          name,
          age,
          gender,
          roomId,
          siblings
        )
        if (studentAffected.updatedStudentCount[0] === 0) {
          res.status(404).end()
        } else {
          res.status(204).end()
        }
      } catch (error) {
        if (error.errors[0].type === 'Validation error') {
          res.status(422).json({ message: error.errors[0].message })
        } else {
          res.status(500).json({ message: 'Internal server error' })
        }
      }
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
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end('Method not allowed')
  }
}

export default studentController
