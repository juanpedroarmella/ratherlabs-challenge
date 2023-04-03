import { Student } from '@/types/interfaces/Student'
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

interface Props {
  students: Student[]
}

const StudentsList: React.FC<Props> = ({ students }) => {
  if (students.length === 0) {
    return (
      <Box m={1}>
        <Alert severity='info'>There are not any students in this room.</Alert>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student: Student) => (
            <TableRow key={`${student.name}-${student.id}`}>
              <TableCell scope='row'>
                <Typography component={Link} href={`/student/${student.id}`}>
                  {student.name}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StudentsList
