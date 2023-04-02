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
        const { name, age, gender, roomId } = req.body
        const newStudent = await studentService.createStudent(
          name,
          age,
          gender,
          roomId
        )
        res.status(201).json(newStudent)
      } catch (error) {
        res.status(500).end('Internal server error')
      }
      break
    }
    case 'PUT': {
      try {
        const { id, name, age, gender, roomId, siblings } = req.body
        const editStudentResponse = await studentService.editStudent(
          id,
          name,
          age,
          gender,
          roomId,
          siblings
        )
        if (editStudentResponse.updatedStudentRows === 0) {
          res.status(404).end('Not found')
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
        const students = await studentService.getAllStudents()
        res.status(200).json(students)
      } catch (error) {
        res.status(500).end('Internal server error')
      }
      break
    }
    default:
      res.setHeader('Allow', ['POST', 'PUT'])
      res.status(405).end('Method not allowed')
  }
}
