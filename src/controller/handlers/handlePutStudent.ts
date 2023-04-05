import * as fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { StudentService } from './../../service/StudentService'
import { EditStudentRequest } from './../../types/interfaces/Student'
import handleSuccessPutStudent from './handleSuccessPutStudent'
import handleUpdateErrors from './handleUpdateErrors'
import checkExtension from '@/utils/checkExtension'
import formidable from 'formidable'

const handlePutStudent = async (
  req: NextApiRequest,
  res: NextApiResponse,
  studentService: StudentService
): Promise<void> => {
  const contentType = req.headers['content-type']

  if (!contentType?.includes('multipart/form-data')) {
    res.status(400).json({ message: 'Bad request' })
    return
  }

  const form = new formidable.IncomingForm()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' })
      return
    }

    const id = parseInt(req.query.id as string)

    const { name, age, gender, roomId, siblings } = fields

    const parsedData = {
      id,
      age: parseInt(age as string),
      roomId: parseInt(roomId as string),
      siblings: JSON.parse(siblings as string),
      name: JSON.parse(name as string),
      gender: JSON.parse(gender as string)
    }

    const profileImage = files.profileImage as formidable.File

    if (profileImage !== undefined) {
      await updateWithImage(profileImage, res, studentService, parsedData)
    } else {
      await updateWithoutImage(res, studentService, parsedData)
    }
  })
}

export default handlePutStudent

const updateWithImage = async (
  profileImage: formidable.File,
  res: NextApiResponse,
  studentService: StudentService,
  parsedData: EditStudentRequest
): Promise<void> => {
  fs.readFile(profileImage.filepath, async (err, data) => {
    if (err != null) {
      res.status(500).json({ message: 'Internal server error' })
      return
    }

    if (checkExtension(profileImage, res)) {
      try {
        const updatedRows = await studentService.editStudent(
          parsedData.id,
          parsedData.name,
          parsedData.age,
          parsedData.gender,
          parsedData.roomId,
          parsedData.siblings,
          data as unknown as Blob
        )

        handleSuccessPutStudent(updatedRows, res)
      } catch (error) {
        handleUpdateErrors(error, res)
      }
    }
  })
}

const updateWithoutImage = async (
  res: NextApiResponse,
  studentService: StudentService,
  parsedData: EditStudentRequest
): Promise<void> => {
  try {
    const updatedRows = await studentService.editStudent(
      parsedData.id,
      parsedData.name,
      parsedData.age,
      parsedData.gender,
      parsedData.roomId,
      parsedData.siblings,
      null
    )

    handleSuccessPutStudent(updatedRows, res)
  } catch (error) {
    handleUpdateErrors(error, res)
  }
}
