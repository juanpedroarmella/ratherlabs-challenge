import { AddStudentRequest, Student } from '@/types/interfaces/Student'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction } from 'react'

interface SiblingListProps {
  siblings: Student[]
  setStudentData: Dispatch<SetStateAction<AddStudentRequest>>
}

const SiblingsList: React.FC<SiblingListProps> = ({
  siblings,
  setStudentData
}) => {
  if (siblings.length === 0) {
    return (
      <Box m={2}>
        <Alert severity='info'>No siblings added yet</Alert>
      </Box>
    )
  }

  return (
    <Grid item mb={2}>
      <Typography variant='h6' mb={2}>
        Siblings:
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {siblings.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={() => {
                      const newSiblings = siblings.filter(
                        (sibling) => sibling.id !== student.id
                      )
                      setStudentData((prevStudentData) => ({
                        ...prevStudentData,
                        siblings: newSiblings
                      }))
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default SiblingsList
