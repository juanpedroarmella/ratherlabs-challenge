import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import RootContainer from '@/components/atoms/RootContainer'
import useFetch from '@/hooks/useFetch'
import type { GetRoomByIdResponse } from '@/types/interfaces/Room'
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
import Link from 'next/link'
import type { GetServerSideProps, NextPage } from 'next/types'

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const idRoom = context?.params?.id as string
  const apiUrl = process.env.API_URL as string
  return { props: { apiUrl, idRoom } }
}

interface Props {
  apiUrl: string
  idRoom: string
}

const Room: NextPage<Props> = ({ apiUrl, idRoom }) => {
  const { isLoading, data, error } = useFetch<GetRoomByIdResponse>(
    `${apiUrl}/room/${idRoom}`
  )

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
      <Typography variant='h5'>{data?.roomName}</Typography>
      <Box display='flex' flexDirection='column' alignItems='flex-start'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.students.map((student: Student) => (
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
export default Room
