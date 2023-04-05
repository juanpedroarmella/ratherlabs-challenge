import { EditStudentResponse } from './../../types/interfaces/Student'
import { NextApiResponse } from 'next/types'

const handleSuccessPutStudent = (
  updatedRows: EditStudentResponse,
  res: NextApiResponse
): void => {
  if (updatedRows.updatedStudentCount === 0) {
    res.status(404).end()
  } else {
    res.status(200).json({ updatedRows })
  }
}

export default handleSuccessPutStudent
