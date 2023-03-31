import RootContainer from '@/atoms/RootContainer'
import type { Student, StudentById } from '@/types/interfaces/Student'
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

interface StudentProps {
  student?: StudentById
  error?: string
}

const StudentPage: NextPage<StudentProps> = ({ student, error }) => {
  if (error) {
    return (
      <RootContainer component='main'>
        <Alert severity='error'>{error}</Alert>
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
                <TableCell>{student.student.name}</TableCell>
                <TableCell>{student.student.age}</TableCell>
                <TableCell>{student.student.gender}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography variant='h5' textAlign='start' mb={2}>
          Siblings
        </Typography>
        {student.siblings.length > 0
          ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {student.siblings.map((student: Student) => (
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

export const getServerSideProps: GetServerSideProps<StudentProps> = async (
  context
) => {
  const { params } = context

  try {
    const apiUrl = process.env.API_URL
    const res = await axios.get(`${apiUrl}/student/${params.id}`)
    const student: StudentById = res.data
    return { props: { student } }
  } catch (e) {
    const error = e.message
    return { props: { error } }
  }
}

export default StudentPage
