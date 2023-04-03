import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import RootContainer from '@/components/atoms/RootContainer'
import useFetch from '@/hooks/useFetch'
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
import Link from 'next/link'
import type { GetServerSideProps, NextPage } from 'next/types'

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const apiUrl = process.env.API_URL as string
  return { props: { apiUrl } }
}

interface Props {
  apiUrl: string
}

const Home: NextPage<Props> = ({ apiUrl }) => {
  const { isLoading, data, error } = useFetch<Room[]>(`${apiUrl}/rooms`)

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error !== null) {
    return (
      <RootContainer component='main'>
        <Alert severity='error'>{error.message}</Alert>
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
            {data?.map((room) => (
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

export default Home
