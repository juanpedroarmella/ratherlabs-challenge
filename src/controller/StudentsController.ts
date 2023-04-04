import { SiblingRepository } from '@/repository/SiblingRepository'
import { NextApiRequest, NextApiResponse } from 'next'
import { StudentService } from '@/service/StudentService'
import { StudentRepository } from '@/repository/StudentRepository'
import { SiblingService } from '@/service/SiblingService'
import sync from '@/db/sync'

export default async function studentController (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await sync()

  const studentRepository = new StudentRepository()

  const siblingRepository = new SiblingRepository()

  const siblingService = new SiblingService(
    siblingRepository,
    studentRepository
  )

  const studentService = new StudentService(studentRepository, siblingService)

  switch (req.method) {
    case 'POST': {
      try {
        const { name, age, gender, roomId, siblings } = req.body
        const newStudent = await studentService.createStudent(
          name,
          age,
          gender,
          roomId,
          siblings
        )
        res.status(201).json(newStudent)
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
        const students = await studentService.getAllStudents()
        res.status(200).json(students)
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
      }
      break
    }
    default:
      res.setHeader('Allow', ['POST', 'GET'])
      res.status(405).end('Method not allowed')
  }
}
