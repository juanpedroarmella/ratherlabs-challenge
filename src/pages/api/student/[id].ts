import studentControllerId from '@/controller/StudentController'
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
  return await studentControllerId(req, res)
}
