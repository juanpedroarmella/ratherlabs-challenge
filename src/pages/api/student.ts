import studentController from '@/controller/StudentController'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  return await studentController(req, res)
}
