import { NextApiResponse } from 'next/types'

const handleUpdateErrors = (error, res: NextApiResponse) => {
  if (
    error.errors !== undefined &&
    error.errors[0].type === 'Validation error'
  ) {
    res.status(422).json({ message: error.errors[0].message })
  } else {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default handleUpdateErrors
