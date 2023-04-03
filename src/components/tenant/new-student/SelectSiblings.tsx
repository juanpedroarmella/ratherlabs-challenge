import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import useFetch from '@/hooks/useFetch'
import useSnackBar from '@/hooks/useSnackBar'
import { AddStudentRequest, Student } from '@/types/interfaces/Student'
import { Alert, Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface SelectSiblingsProps {
  siblings: Student[]
  setStudentData: Dispatch<SetStateAction<AddStudentRequest>>
  apiUrl: string
}

const SelectSiblings: React.FC<SelectSiblingsProps> = ({
  siblings,
  setStudentData,
  apiUrl
}): JSX.Element => {
  const { isLoading, data, error } = useFetch<Student[]>(`${apiUrl}/students`)

  const { Snackbar, openSnackbar } = useSnackBar()

  const [selectedSibling, setSelectedSibling] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setSelectedSibling(value)
    const findSibling = data?.find((student) => student.id.toString() == value)
    if (findSibling != null) {
      const siblingExists = siblings.some(
        (sibling) => sibling.id === findSibling.id
      )
      if (!siblingExists) {
        setStudentData((prevStudentData) => ({
          ...prevStudentData,
          siblings: [...siblings, findSibling]
        }))
      } else {
        openSnackbar('error', 'Sibling already added!') // <- Mensaje de error
      }
    }
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error !== null) {
    return (
      <Box p={2}>
        <Alert severity='error'>
          {'There was an error loading the students list: ' + error.message}
        </Alert>
      </Box>
    )
  }

  return (
    <Grid item>
      <TextField
        fullWidth
        select
        label='Sibling'
        name='sibling'
        value={selectedSibling}
        onChange={handleChange}
        required
      >
        {data?.map((student) => {
          return (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          )
        })}
      </TextField>
      <>{Snackbar}</>
    </Grid>
  )
}

export default SelectSiblings
