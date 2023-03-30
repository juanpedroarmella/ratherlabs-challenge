import { NextApiRequest, NextApiResponse } from 'next'
import { StudentService } from '@/service/StudentService'
import { StudentRepository } from '@/repository/StudentRepository'
import sequelize from '@/db/db'
import { StudentModel } from '@/model/StudentModel'
import { RoomModel } from '@/model/RoomModel'
import { SiblingModel } from '@/model/SiblingModel'

const studentRepository = new StudentRepository()
const studentService = new StudentService(studentRepository)

export default async function studentController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sequelize.sync()
  sequelize.addModels([StudentModel, RoomModel, SiblingModel])
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
        console.error(error)
        res.status(500).end('Internal server error')
      }
      break
    }
    case 'PUT': {
      try {
        const { id, name, age, gender, roomId, siblingId } = req.body
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
        console.error(error)
        res.status(500).end('Internal server error')
      }
      break
    }
    case 'GET': {
      try {
        const { id, name, age, gender, roomId, siblingId } = req.body
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
        console.error(error)
        res.status(500).end('Internal server error')
      }
      break
    }
    default:
      res.setHeader('Allow', ['POST', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
