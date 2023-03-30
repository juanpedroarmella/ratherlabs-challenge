import roomController from '@/controller/RoomController'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await roomController(req, res)
}
