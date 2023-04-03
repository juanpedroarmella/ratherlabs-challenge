import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import useFetch from '@/hooks/useFetch'
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

  const [selectedSibling, setSelectedSibling] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setSelectedSibling(value)
    const findSibling = data?.find((student) => student.id.toString() == value)
    if (findSibling != null) {
      setStudentData((prevStudentData) => ({
        ...prevStudentData,
        siblings: [...siblings, findSibling]
      }))
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
    </Grid>
  )
}

export default SelectSiblings
