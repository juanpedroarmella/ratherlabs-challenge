import RootContainer from '@/atoms/RootContainer'
import type { RoomById } from '@/types/interfaces/Room'
import type { Student } from '@/types/interfaces/Student'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Link from 'next/link'
import type { GetServerSideProps, NextPage } from 'next/types'

interface RoomProps {
  room?: RoomById
  error?: string
}

const Room: NextPage = ({ room, error }: RoomProps) => {
  if (error) {
    return (
      <RootContainer component='main'>
        <Alert severity='error'>{error}</Alert>
      </RootContainer>
    )
  }

  return (
    <RootContainer component='main'>
      <Typography variant='h5'>{room.roomName}</Typography>
      <Box display='flex' flexDirection='column' alignItems='flex-start'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {room.students.map((student: Student) => (
                <TableRow key={`${student.name}-${student.id}`}>
                  <TableCell scope='row'>
                    <Typography
                      component={Link}
                      href={`/student/${student.id}`}
                    >
                      {student.name}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </RootContainer>
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
