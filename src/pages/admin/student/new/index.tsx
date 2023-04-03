import RootContainer from '@/components/atoms/RootContainer'
import SelectRoom from '@/components/tenant/new-student/SelectRoom'
import SelectSiblings from '@/components/tenant/new-student/SelectSiblings'
import SiblingsList from '@/components/tenant/new-student/SiblingsList'
import useSnackBar from '@/hooks/useSnackBar'
import { AddStudentRequest } from '@/types/interfaces/Student'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
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
  gender: 'other',
  roomId: 0,
  siblings: []
}

const NewStudent: NextPage<PageProps> = ({ apiUrl }) => {
  const [studentData, setStudentData] = useState<AddStudentRequest>(voidForm)
  const [isLoading, setIsLoading] = useState(false)
  const { Snackbar, openSnackbar } = useSnackBar()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    const newValue = event.target.type === 'number' ? Number(value) : value
    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      [name]: newValue
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
      openSnackbar('success', 'Estudiante creado con éxito')
    } catch (error) {
      openSnackbar('error', error.message)
    }
    setIsLoading(false)
  }

  return (
    <RootContainer component='main'>
      <Typography variant='h4'>Add Student</Typography>

      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <TextField
              fullWidth
              label='Name'
              name='name'
              value={studentData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label='Age'
              name='age'
              type='number'
              value={studentData.age}
              inputProps={{ min: 3 }}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              select
              label='Gender'
              name='gender'
              value={studentData.gender}
              onChange={handleChange}
              required
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
              <MenuItem value='other'>Other</MenuItem>
            </TextField>
          </Grid>

          <SelectRoom
            roomId={studentData.roomId}
            handleChange={handleChange}
            apiUrl={apiUrl}
          />

          <SelectSiblings
            siblings={studentData.siblings}
            setStudentData={setStudentData}
            apiUrl={apiUrl}
          />

          <SiblingsList
            siblings={studentData.siblings}
            setStudentData={setStudentData}
          />

          <Grid item>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Enviar'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <>{Snackbar}</>
    </RootContainer>
  )
}

export default NewStudent
