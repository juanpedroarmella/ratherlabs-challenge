import { useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import RootContainer from '@/atoms/RootContainer'
import Typography from '@mui/material/Typography'
import { GetServerSideProps } from 'next/types'

const NewRoom = ({ apiUrl }) => {
  const [room, setRoom] = useState({
    name: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post(`${apiUrl}/rooms`, room)
      console.log(response.data)
      setRoom({
        name: ''
      })
      setIsSnackbarOpen(true)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      {
        error && <Typography color='error'>Error: {error.message}</Typography>
      }
    }
    setIsLoading(false)
  }

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false)
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
              disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}>
        <MuiAlert
          onClose={handleSnackbarClose}
          severity='success'
          sx={{ width: '100%' }}>
          Room created successfully!
        </MuiAlert>
      </Snackbar>
    </RootContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.API_URL
  return { props: { apiUrl } }
}

export default NewRoom
