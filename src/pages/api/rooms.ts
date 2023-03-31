import roomController from '@/controller/RoomsController'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await roomController(req, res)
}
