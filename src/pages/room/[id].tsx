import Link from 'next/link'
import type { NextPage, GetServerSideProps } from 'next/types'
import axios from 'axios'
import { Alert, Typography, List, ListItem } from '@mui/material'
import Box from '@mui/material/Box'
import { RoomById } from '@/types/interfaces/Room'
import { Student } from '@/types/interfaces/Student'

interface RoomProps {
  room?: RoomById
  error?: string
}

const Room: NextPage = ({ room, error }: RoomProps) => {
  console.log(room)
  if (error) {
    return (
      <Box m={4}>
        <Alert severity='error'>{error}</Alert>
      </Box>
    )
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      mx='5vw'
      my={2}
      gap={2}
    >
      <Typography variant='h5'>{room.roomName}</Typography>
      <Box>
        <Typography variant='subtitle1'>Students</Typography>
        <List>
          {room.students.map((student: Student) => (
            <ListItem
              component={Link}
              key={`${student.id}-${student.id}`}
              href={`/student/${student.id}`}
            >
              {student.name}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<RoomProps> = async (
  context
) => {
  const { params } = context

  try {
    const apiUrl = process.env.API_URL
    const res = await axios.get(`${apiUrl}/room/${params.id}`)
    const room: RoomById = res.data
    return { props: { room } }
  } catch (e) {
    const error = e.message
    return { props: { error } }
  }
}

export default Room
