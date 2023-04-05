import ImageUploader from '@/components/atoms/ImageUploader'
import RootContainer from '@/components/atoms/RootContainer'
import SelectRoom from '@/components/selects/SelectRoom'
import SelectStudent from '@/components/selects/SelectStudent'
import SelectSiblings from '@/components/selects/SelectSiblings'
import SiblingsList from '@/components/selects/SiblingsList'
import useSnackBar from '@/hooks/useSnackBar'
import type {
  EditStudentRequest,
  GetStudentByIdResponse,
  ImageInfo,
  Student
} from '@/types/interfaces/Student'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next/types'
import { ChangeEvent, FormEvent, useState } from 'react'

import Image from 'next/image'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import handleEditStudentSubmit from '@/components/tenant/edit-student/utils/handleEditStudentSubmit'

interface PageProps {
  apiUrl: string
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.API_URL
  return { props: { apiUrl } }
}

interface FormData extends EditStudentRequest {
  roomName?: string
}

const voidForm: FormData = {
  id: 0,
  name: '',
  age: 0,
  gender: 'other',
  roomId: 0,
  roomName: '',
  siblings: [],
  profileImage: null
}

const EditStudent: NextPage<PageProps> = ({ apiUrl }) => {
  const [studentData, setStudentData] = useState<FormData>(voidForm)

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

  const handleChangeSelectStudent = async (student: Student): Promise<void> => {
    const studentDetail = await axios.get<GetStudentByIdResponse>(
      `${apiUrl}/student/${student.id}`
    )

    const setStudentInfo: FormData = {
      name: studentDetail.data.name,
      age: studentDetail.data.age,
      gender: studentDetail.data.gender,
      siblings: studentDetail.data.siblings,
      id: studentDetail.data.id,
      profileImage: studentDetail.data.profileImage,
      roomId:
        studentDetail.data.room != null ? studentDetail.data.room.id : null,
      roomName:
        studentDetail.data.room != null ? studentDetail.data.room.name : ''
    }

    setStudentData(setStudentInfo)
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    await handleEditStudentSubmit(
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
      <Typography variant='h4'>Edit a student</Typography>
      <SelectStudent
        handleChange={handleChangeSelectStudent}
        apiUrl={apiUrl}
        key={`SelectStudent-${isLoading.toString()}`}
      />

      {studentData.id === 0 ? (
        <Alert severity='info'>No student selected</Alert>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: '50%' }}>
          <Grid container direction='column' spacing={2}>
            {studentData?.profileImage !== null && (
              <Grid item>
                <Paper sx={{ width: 'fit-content', p: 1 }}>
                  <Image
                    src={
                      (studentData.profileImage as ImageInfo).data
                        ? `data:image/${
                            (studentData.profileImage as ImageInfo).ext
                          };base64,${Buffer.from(
                            (studentData.profileImage as ImageInfo).data.data
                          ).toString('base64')}`
                        : URL.createObjectURL(studentData.profileImage as Blob)
                    }
                    alt='Profile Image'
                    width={100}
                    height={100}
                  />
                </Paper>
              </Grid>
            )}

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
              handleChange={handleChange}
              apiUrl={apiUrl}
              inputName='roomId'
              initialValue={{
                id: studentData.roomId as number,
                name: studentData.roomName as string
              }}
              key={`SelectRoom-${isLoading.toString()}`}
            />

            <SelectSiblings
              siblings={studentData.siblings as []}
              setStudentData={setStudentData}
              apiUrl={apiUrl}
              key={`SelectSiblings-${isLoading.toString()}`}
            />

            <SiblingsList
              siblings={studentData.siblings as []}
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
                {isLoading ? 'Cargando...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      <>{Snackbar}</>
    </RootContainer>
  )
}

export default EditStudent
