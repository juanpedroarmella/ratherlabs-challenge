import roomsController from '@/controller/RoomsController'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return await roomsController(req, res)
}
