import Link from 'next/link'
import { Box, Typography, Alert, List, ListItem } from '@mui/material'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next/types'
import { Student, StudentById } from '@/types/interfaces/Student'
import { RoomById } from '@/types/interfaces/Room'

interface StudentProps {
  student?: StudentById
  error?: string
}

const StudentPage: NextPage<StudentProps> = ({ student, error }) => {
  if (error) {
    return (
      <Box m={4}>
        <Alert severity='error'>{error}</Alert>
      </Box>
    )
  }

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mx: '5vw',
        my: 2
      }}
    >
      <Typography variant='h4'>Student Information</Typography>
      <Box p={1} display='grid' gap={1}>
        <Typography>Name: {student.student.name}</Typography>
        <Typography>Age: {student.student.age}</Typography>
        <Typography>Gender: {student.student.gender}</Typography>
        <Typography>Siblings:</Typography>
        {student.siblings.length > 0
          ? (
            <List>
              {student.siblings.map((sibling: Student) => (
                <ListItem key={`${sibling.name}-${sibling.id}`}>
                  <Typography component={Link} href={`/student/${sibling.id}`}>
                    {sibling.name}{' '}
                  </Typography>
                </ListItem>
              ))}
            </List>
            )
          : (
            <Typography pl={1}>The student does not have any siblings</Typography>
            )}
      </Box>
    </Box>
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
