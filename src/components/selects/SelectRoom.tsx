import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import useFetch from '@/hooks/useFetch'
import {
  EditRoomRequest,
  GetAllRoomsResponse,
  Room
} from '@/types/interfaces/Room'
import { Alert, Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { ChangeEvent, SetStateAction, useState } from 'react'

interface SelectRoomProps {
  inputName: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  apiUrl: string
  setRoomName?: (value: SetStateAction<EditRoomRequest>) => void
  initialValue?: Room | null
}

const SelectRoom: React.FC<SelectRoomProps> = ({
  inputName,
  apiUrl,
  handleChange,
  setRoomName,
  initialValue
}): JSX.Element => {
  const {
    isLoading,
    data: rooms,
    error
  } = useFetch<GetAllRoomsResponse>(`${apiUrl}/rooms`)

  const [roomSelected, setRoomSelected] = useState<Room>(
    initialValue ?? {
      id: 0,
      name: ''
    }
  )

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    const room = rooms?.rooms.find((room) => room.id === parseInt(value))
    if (room != null) {
      setRoomSelected(room)
      if (setRoomName != null) {
        setRoomName((prevRoom) => ({
          ...prevRoom,
          name: room.name
        }))
      }

      handleChange(event)
    }
  }

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
        name={inputName}
        value={roomSelected?.id}
        onChange={handleSelectChange}
        required
      >
        {rooms?.rooms.map((room: Room) => {
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
