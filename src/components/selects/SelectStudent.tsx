import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import useFetch from '@/hooks/useFetch'
import { GetAllStudentsResponse, Student } from '@/types/interfaces/Student'
import { Alert, Box } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { ChangeEvent, useState } from 'react'

interface Props {
  handleChange: (
    student: Student,
    event?: ChangeEvent<HTMLInputElement>
  ) => Promise<void> | void
  apiUrl: string
}

const SelectStudent: React.FC<Props> = ({
  handleChange,
  apiUrl
}): JSX.Element => {
  const { isLoading, data, error } = useFetch<GetAllStudentsResponse>(
    `${apiUrl}/students`
  )

  const [studentSelected, setStudentSelected] = useState<Student>({
    id: 0,
    name: ''
  })

  const handleSelectChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { value } = event.target
    const student = data?.students.find(
      (student) => student.id === parseInt(value)
    )
    if (student != null) {
      setStudentSelected(student)
      void (await handleChange(student, event))
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
    <TextField
      fullWidth
      select
      label='Select a student'
      name='student'
      value={studentSelected.id}
      onChange={handleSelectChange}
    >
      {data?.students.map((student: Student) => {
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
