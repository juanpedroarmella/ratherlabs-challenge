import formidable from 'formidable'
import * as fs from 'fs'
import { NextApiResponse } from 'next'

const checkExtension = (
  profileImage: formidable.File,
  res: NextApiResponse
): boolean => {
  const acceptedExtensions = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg+xml'
  ]

  const fileExtension = (profileImage.mimetype as string).toLowerCase()

  if (!acceptedExtensions.includes(fileExtension)) {
    fs.unlinkSync(profileImage.filepath)
    res.status(400).json({ message: 'Invalid file extension' })
    return false
  }

  return true
}

export default checkExtension
