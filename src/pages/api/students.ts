import studentController from '@/controller/StudentsController'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return await studentController(req, res)
}
