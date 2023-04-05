import SelectStudent from '@/components/selects/SelectStudent'
import useSnackBar from '@/hooks/useSnackBar'
import {
  EditStudentRequest,
  NewStudentRequest,
  Student
} from '@/types/interfaces/Student'
import { Grid, Typography } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface Props {
  siblings: Student[]
  apiUrl: string
  setStudentData: Dispatch<
  SetStateAction<NewStudentRequest | EditStudentRequest>
  >
}

const SelectSiblings: React.FC<Props> = ({
  siblings,
  apiUrl,
  setStudentData
}): JSX.Element => {
  const { Snackbar, openSnackbar } = useSnackBar()

  const handleSiblingChange = (
    student: Student,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target

    const studentExists = siblings.some(
      (student: Student) => student.id === parseInt(value)
    )

    if (!studentExists) {
      setStudentData((prevStudentData) => ({
        ...prevStudentData,
        siblings: [...siblings, student]
      }))
    } else {
      openSnackbar('error', 'Student already added')
    }
  }

  return (
    <Grid item>
      <Typography variant='h6' mb={2}>
        Add sibling:
      </Typography>
      <SelectStudent handleChange={handleSiblingChange} apiUrl={apiUrl} />
      <>{Snackbar}</>
    </Grid>
  )
}

export default SelectSiblings
