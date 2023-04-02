import roomControllerId from '@/controller/RoomController'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return await roomControllerId(req, res)
}
