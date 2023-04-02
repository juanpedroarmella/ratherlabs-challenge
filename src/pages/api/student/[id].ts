import studentControllerId from '@/controller/StudentController'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return await studentControllerId(req, res)
}
