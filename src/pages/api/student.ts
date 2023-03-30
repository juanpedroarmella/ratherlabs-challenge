import studentController from '@/controller/StudentController'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return studentController(req, res)
}
