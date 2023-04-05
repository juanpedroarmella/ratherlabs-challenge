import { RoomService } from '@/service/RoomService'
import { RoomRepository } from '@/repository/RoomRepository'
import checkExtension from '@/utils/checkExtension'
import { SiblingRepository } from '@/repository/SiblingRepository'
import { NextApiRequest, NextApiResponse } from 'next'
import { StudentService } from '@/service/StudentService'
import { StudentRepository } from '@/repository/StudentRepository'
import { SiblingService } from '@/service/SiblingService'
import sync from '@/db/sync'
import formidable from 'formidable'
import * as fs from 'fs'

export default async function studentController (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
): Promise<void> {
  await sync()

  const studentRepository = new StudentRepository()

  const siblingRepository = new SiblingRepository()

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
    case 'POST': {
      const contentType = req.headers['content-type'] || ''
      if (!contentType.includes('multipart/form-data')) {
        res.status(400).json({ message: 'Bad request' })
        return
      }

      const form = new formidable.IncomingForm()

      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(500).json({ message: 'Internal server error' })
          return
        }

        const { name, age, gender, roomId, siblings } = fields

        const parsedAge = parseInt(age as string)
        const parsedRoomId = parseInt(roomId as string)
        const parsedSiblings = JSON.parse(siblings as string)
        const parsedName = JSON.parse(name as string)
        const parsedGender = JSON.parse(gender as string)

        const profileImage = files.profileImage as formidable.File

        fs.readFile(profileImage.filepath, async (err, data) => {
          if (err != null) {
            res.status(500).json({ message: 'Internal server error' })
            return
          }

          if (checkExtension(profileImage, res)) {
            try {
              const newStudent = await studentService.createStudent(
                parsedName,
                parsedAge,
                parsedGender,
                parsedRoomId,
                parsedSiblings,
                data as unknown as Blob
              )

              res.status(200).json(newStudent)
            } catch (error) {
              if (
                error.errors !== undefined &&
                error.errors[0].type === 'Validation error'
              ) {
                res.status(422).json({ message: error.errors[0].message })
              } else {
                res.status(500).json({ message: 'Internal server error' })
              }
            }
          }
        })
      })
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
