import RootContainer from '@/atoms/RootContainer'
import type { Room } from '@/types/interfaces/Room'
import Alert from '@mui/material/Alert'
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

interface Props {
  rooms?: Room[]
  error?: string
}

const Home: NextPage<Props> = ({ rooms, error }) => {
  if (error) {
    return (
      <RootContainer component='main'>
        <Alert severity='error'>{error}</Alert>
      </RootContainer>
    )
  }

  return (
    <RootContainer component='main'>
      <Typography variant='h4'>Rooms</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={`${room.id}-${room.name}`}>
                <TableCell scope='row'>
                  <Typography component={Link} href={`/room/${room.id}`}>
                    {room.name}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </RootContainer>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const apiUrl = process.env.API_URL
    const res = await axios.get(`${apiUrl}/rooms`)
    const rooms: Room[] = res.data

    return { props: { rooms } }
  } catch (e) {
    return { props: { error: e.message } }
  }
}

export default Home
