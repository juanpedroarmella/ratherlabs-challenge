import sequelize from '@/db/db'
import { RoomModel } from '@/model/RoomModel'
import { SiblingModel } from '@/model/SiblingModel'
import { StudentModel } from '@/model/StudentModel'
import { SiblingRepository } from '@/repository/SiblingRepository'
import { StudentRepository } from '@/repository/StudentRepository'
import { StudentService } from '@/service/StudentService'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function studentController (
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sequelize.sync()
  sequelize.addModels([StudentModel, RoomModel, SiblingModel])

  const siblingRepository = new SiblingRepository()
  const studentRepository = new StudentRepository()

  const studentService = new StudentService(
    studentRepository,
    siblingRepository
  )

  switch (req.method) {
    case 'PUT': {
      try {
        const id = parseInt(req.query.id as string)
        const { name, age, gender, roomId, siblingId } = req.body
        const [rowsAffected] = await studentService.editStudent(
          id,
          name,
          age,
          gender,
          roomId,
          siblingId
        )
        if (rowsAffected === 0) {
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
        const students = await studentService.getStudentById(id)
        students ? res.status(200).json(students) : res.status(404).end()
      } catch (error) {
        res.status(500).end('Internal server error')
      }
      break
    }
    default:
      res.setHeader('Allow', ['POST', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
