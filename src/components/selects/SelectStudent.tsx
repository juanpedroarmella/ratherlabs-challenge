import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import useFetch from '@/hooks/useFetch'
import { Student } from '@/types/interfaces/Student'
import { Alert, Box } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { ChangeEvent } from 'react'

interface Props {
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data?: Student[]
  ) => void
  selectedStudent: string
  apiUrl: string
}

const SelectStudent: React.FC<Props> = ({
  handleChange,
  selectedStudent,
  apiUrl
}): JSX.Element => {
  const { isLoading, data, error } = useFetch<Student[]>(`${apiUrl}/students`)

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
    <TextField
      fullWidth
      select
      label='Select a student'
      name='student'
      value={selectedStudent}
      onChange={(e) => handleChange(e, data as [])}
    >
      {data?.map((student) => {
        return (
          <MenuItem key={student.id} value={student.id}>
            {student.name}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default SelectStudent
