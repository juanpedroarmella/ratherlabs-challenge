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
        if (studentAffected.updatedStudentRows === 0) {
          res.status(404).end(`Student with id ${id} not found`)
        } else {
          res.status(204).end()
        }
      } catch (error) {
        res.status(500).end('Internal server error')
      }
      break
    }
    case 'GET': {
      try {
        const id = parseInt(req.query.id as string)
        if (Number.isNaN(id)) {
          const errorMessage = `Invalid id: ${req.query.id as string}`
          throw new Error(errorMessage)
        }
        const student = await studentService.getStudentById(id)
        student != null ? res.status(200).json(student) : res.status(404).end()
      } catch (error) {
        res.status(500).end('Internal server error')
        console.log(error)
      }
      break
    }
    default:
      res.setHeader('Allow', ['POST', 'PUT'])
      res.status(405).end('Method not allowed')
  }
}

export default studentController
