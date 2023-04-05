import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import RootContainer from '@/components/atoms/RootContainer'
import Typography from '@mui/material/Typography'
import type { GetServerSideProps, NextPage } from 'next/types'
import useSnackBar from '@/hooks/useSnackBar'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import SelectStudent from '@/components/selects/SelectStudent'
import { GetStudentByIdResponse, Student } from '@/types/interfaces/Student'

interface Props {
  apiUrl: string
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const apiUrl = process.env.API_URL as string
  return { props: { apiUrl } }
}

interface FormData {
  name: string
  id: number
}

const voidForm: FormData = {
  name: '',
  id: 0
}

const DeleteStudent: NextPage<Props> = ({ apiUrl }): JSX.Element => {
  const [student, setStudent] = useState<FormData>(voidForm)
  const [isLoading, setIsLoading] = useState(false)
  const { Snackbar, openSnackbar } = useSnackBar()

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setStudent((prevRoom) => ({
      ...prevRoom,
      [name]: value
    }))
  }

  const handleChangeSelectStudent = async (student: Student): Promise<void> => {
    const studentDetail = await axios.get<GetStudentByIdResponse>(
      `${apiUrl}/student/${student.id}`
    )

    const setStudentInfo: FormData = {
      id: studentDetail.data.id,
      name: studentDetail.data.name
    }

    setStudent(setStudentInfo)
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await axios.delete(`${apiUrl}/student/${student.id}`)
      setStudent(voidForm)
      openSnackbar('success', 'Student Deleted')
    } catch (error) {
      setIsLoading(false)
      openSnackbar('error', error.message)
    }
    setIsLoading(false)
  }

  return (
    <RootContainer component='main'>
      <Typography variant='h4'>Delete Room</Typography>

      <form onSubmit={handleSubmit} style={{ width: '40%' }}>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <SelectStudent
              handleChange={handleChangeSelectStudent}
              apiUrl={apiUrl}
              key={`SelectStudent-${isLoading.toString()}`}
            />
          </Grid>
          {student.id === 0
            ? (
              <Grid item>
                <Alert severity='info'>No student selected</Alert>
              </Grid>
              )
            : (
              <>
                <Grid item>
                  <TextField
                    label='Name'
                    name='name'
                    value={student.name}
                    onChange={handleNameChange}
                    required
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant='contained'
                    color='error'
                    type='submit'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Delete Student'}
                  </Button>
                </Grid>
              </>
              )}
        </Grid>
      </form>

      <>{Snackbar}</>
    </RootContainer>
  )
}

export default DeleteStudent
