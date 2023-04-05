import ImageUploader from '@/components/atoms/ImageUploader'
import RootContainer from '@/components/atoms/RootContainer'
import SelectRoom from '@/components/selects/SelectRoom'
import handleNewStudentSubmit from '@/components/tenant/new-student/utils/handleNewStudentSubmit'
import SelectSiblings from '@/components/selects/SelectSiblings'
import SiblingsList from '@/components/selects/SiblingsList'
import useSnackBar from '@/hooks/useSnackBar'
import type { NewStudentRequest } from '@/types/interfaces/Student'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { GetServerSideProps, NextPage } from 'next/types'
import { ChangeEvent, FormEvent, useState } from 'react'

interface PageProps {
  apiUrl: string
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.API_URL
  return { props: { apiUrl } }
}

const voidForm: NewStudentRequest = {
  name: '',
  age: 3,
  gender: 'other',
  roomId: 0,
  siblings: [],
  profileImage: null
}

const NewStudent: NextPage<PageProps> = ({ apiUrl }) => {
  const [studentData, setStudentData] = useState<NewStudentRequest>(voidForm)
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (studentData.roomId === 0) {
      openSnackbar('error', 'You have to select a room')
      return
    }

    if (studentData.profileImage == null) {
      openSnackbar('error', 'You have to select an image')
      return
    }
    await handleNewStudentSubmit(
      studentData,
      setIsLoading,
      setStudentData,
      voidForm,
      openSnackbar,
      apiUrl
    )
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
              required>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
              <MenuItem value='other'>Other</MenuItem>
            </TextField>
          </Grid>

          <SelectRoom
            apiUrl={apiUrl}
            handleChange={handleChange}
            inputName='roomId'
            key={`SelectRoom-${isLoading.toString()}`}
          />

          <SelectSiblings
            apiUrl={apiUrl}
            setStudentData={setStudentData}
            siblings={studentData.siblings}
            key={`SelectSiblings-${isLoading.toString()}`}
          />

          <SiblingsList
            siblings={studentData.siblings}
            setStudentData={setStudentData}
          />

          <ImageUploader
            setStudentData={setStudentData}
            key={`SelectImage-${isLoading.toString()}`}
          />

          <Grid item>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={isLoading}>
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
