import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import RootContainer from '@/components/atoms/RootContainer'
import Typography from '@mui/material/Typography'
import { GetServerSideProps, NextPage } from 'next/types'
import useSnackBar from '@/hooks/useSnackBar'
import type { AddRoomRequest } from '@/types/interfaces/Room'

const voidForm = {
  name: ''
}

interface NewRoomProps {
  apiUrl: string
}

const NewRoom: NextPage<NewRoomProps> = ({ apiUrl }): JSX.Element => {
  const [room, setRoom] = useState<AddRoomRequest>(voidForm)
  const [isLoading, setIsLoading] = useState(false)
  const { Snackbar, openSnackbar } = useSnackBar()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setRoom((prevRoom) => ({
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
      await axios.post(`${apiUrl}/rooms`, room)
      setRoom(voidForm)
      openSnackbar('success', 'Room created')
    } catch (error) {
      console.error(error)
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
              value={room.name}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.API_URL
  return { props: { apiUrl } }
}

export default NewRoom
