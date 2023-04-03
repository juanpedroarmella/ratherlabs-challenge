import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import useFetch from '@/hooks/useFetch'
import { Room } from '@/types/interfaces/Room'
import { Alert, Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { ChangeEvent } from 'react'

interface SelectRoomProps {
  roomId: number
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  apiUrl: string
}

const SelectRoom: React.FC<SelectRoomProps> = ({
  roomId,
  handleChange,
  apiUrl
}): JSX.Element => {
  const { isLoading, data, error } = useFetch<Room[]>(`${apiUrl}/rooms`)

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error !== null) {
    return (
      <Box p={2}>
        <Alert severity='error'>
          {'There was an error loading the rooms list: ' + error.message}
        </Alert>
      </Box>
    )
  }

  return (
    <Grid item>
      <TextField
        fullWidth
        select
        label='Room'
        name='roomId'
        value={roomId}
        onChange={handleChange}
        required
      >
        {data?.map((room) => {
          return (
            <MenuItem key={`${room.id}-${room.name}`} value={room.id}>
              {room.name}
            </MenuItem>
          )
        })}
      </TextField>
    </Grid>
  )
}

export default SelectRoom
