import roomControllerId from '@/controller/RoomControllerId'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await roomControllerId(req, res)
}
