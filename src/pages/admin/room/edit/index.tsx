import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import RootContainer from '@/components/atoms/RootContainer'
import Typography from '@mui/material/Typography'
import type { GetServerSideProps, NextPage } from 'next/types'
import useSnackBar from '@/hooks/useSnackBar'
import SelectRoom from '@/components/selects/SelectRoom'
import axios from 'axios'
import { EditRoomRequest } from '@/types/interfaces/Room'
import Alert from '@mui/material/Alert'

interface Props {
  apiUrl: string
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const apiUrl = process.env.API_URL as string
  return { props: { apiUrl } }
}

const voidForm: EditRoomRequest = {
  name: '',
  id: 0
}

const EditRoom: NextPage<Props> = ({ apiUrl }): JSX.Element => {
  const [room, setRoom] = useState<EditRoomRequest>(voidForm)
  const [isLoading, setIsLoading] = useState(false)
  const { Snackbar, openSnackbar } = useSnackBar()

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
      await axios.put(`${apiUrl}/room/${room.id}`, room)
      setRoom(voidForm)
      openSnackbar('success', 'Room updated')
    } catch (error) {
      setIsLoading(false)
      openSnackbar('error', error.message)
    }
    setIsLoading(false)
  }

  return (
    <RootContainer component='main'>
      <Typography variant='h4'>Edit Room</Typography>

      <form onSubmit={handleSubmit} style={{ width: '40%' }}>
        <Grid container direction='column' spacing={2}>
          <SelectRoom
            setRoomName={setRoom}
            handleChange={handleNameChange}
            apiUrl={apiUrl}
            inputName='id'
            key={`SelectRoom-${isLoading.toString()}`}
          />
          {room.id === 0
            ? (
              <Grid item>
                <Alert severity='info'>No room selected</Alert>
              </Grid>
              )
            : (
              <>
                <Grid item>
                  <TextField
                    label='Name'
                    name='name'
                    value={room.name}
                    onChange={handleNameChange}
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
              </>
              )}
        </Grid>
      </form>

      <>{Snackbar}</>
    </RootContainer>
  )
}

export default EditRoom
