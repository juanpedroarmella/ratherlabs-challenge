import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import RootContainer from '@/components/atoms/RootContainer'
import useFetch from '@/hooks/useFetch'
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
  const idStudent = context?.params?.id as string
  const apiUrl = process.env.API_URL as string
  return { props: { apiUrl, idStudent } }
}

interface Props {
  apiUrl: string
  idStudent: string
}

const StudentPage: NextPage<Props> = ({ apiUrl, idStudent }) => {
  const { isLoading, data, error } = useFetch<Student>(
    `${apiUrl}/student/${idStudent}`
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
      <Box>
        <Typography variant='h5' textAlign='start' mb={2}>
          Student Information
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{data?.name}</TableCell>
                <TableCell>{data?.age}</TableCell>
                <TableCell>{data?.gender}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography variant='h5' textAlign='start' mb={2}>
          Siblings
        </Typography>
        {(data != null) && (data.siblings != null) && data.siblings.length > 0
          ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.siblings.map((student: Student) => (
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
            )
          : (
            <Alert severity='info'>The student does not have any siblings</Alert>
            )}
      </Box>
    </RootContainer>
  )
}

export default StudentPage
