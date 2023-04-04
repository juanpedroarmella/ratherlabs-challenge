import SelectStudent from '@/components/selects/SelectStudent'
import useSnackBar from '@/hooks/useSnackBar'
import { Student } from '@/types/interfaces/Student'
import { Grid, Typography } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface Props {
  siblings: Student[]
  setStudentData: Dispatch<SetStateAction<Student>>
  apiUrl: string
}

const SelectSiblings: React.FC<Props> = ({
  siblings,
  setStudentData,
  apiUrl
}): JSX.Element => {
  const { Snackbar, openSnackbar } = useSnackBar()

  const [selectedStudent, setSelectedStudent] = useState<string>('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: Student[]
  ): void => {
    const { value } = event.target
    setSelectedStudent(value)
    const findStudent = data?.find(
      (student) => (student.id as number).toString() == value
    )
    if (findStudent != null) {
      const studentExists = siblings.some(
        (student) => student.id === findStudent.id
      )
      if (!studentExists) {
        setStudentData((prevStudentData) => ({
          ...prevStudentData,
          siblings: [...siblings, findStudent]
        }))
      } else {
        openSnackbar('error', 'Student already added')
      }
    }
  }

  return (
    <Grid item>
      <Typography variant='h6' mb={2}>
        Add sibling:
      </Typography>
      <SelectStudent
        handleChange={handleChange}
        selectedStudent={selectedStudent}
        apiUrl={apiUrl}
      />
      <>{Snackbar}</>
    </Grid>
  )
}

export default SelectSiblings
