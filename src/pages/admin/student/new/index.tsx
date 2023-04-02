import RootContainer from '@/atoms/RootContainer'
import useSnackBar from '@/hooks/useSnackBar'
import { AddStudentRequest } from '@/types/interfaces/Student'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next/types'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

interface PageProps {
  apiUrl: string
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.API_URL
  return { props: { apiUrl } }
}

const voidForm: AddStudentRequest = {
  name: '',
  age: 0,
  gender: 'male',
  roomId: 0,
  siblings: []
}

const NewStudent: NextPage<PageProps> = ({ apiUrl }) => {
  const [studentData, setStudentData] = useState<AddStudentRequest>(voidForm)

  const [isLoading, setIsLoading] = useState(false)
  const { Snackbar, openSnackbar } = useSnackBar()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setStudentData((prevRoom) => ({
      ...prevRoom,
      [name]: value
    }))
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await axios.post(`${apiUrl}/students`, studentData)
      setStudentData(voidForm)
      openSnackbar('success', 'Room created')
    } catch (error) {
      setIsLoading(false)
      openSnackbar('error', error.message)
    }
    setIsLoading(false)
  }

  return (
    <RootContainer component='main'>
      <Typography variant='h4'>Add Room</Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <TextField
              label='Name'
              name='name'
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <>{Snackbar}</>
    </RootContainer>
  )
}

export default NewStudent
