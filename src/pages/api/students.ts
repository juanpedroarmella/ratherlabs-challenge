import studentController from '@/controller/StudentsController'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await studentController(req, res)
}
