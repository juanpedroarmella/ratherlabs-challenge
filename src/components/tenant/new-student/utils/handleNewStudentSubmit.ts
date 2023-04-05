import { NewStudentRequest } from '@/types/interfaces/Student'
import { AlertColor } from '@mui/material/Alert'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'

const handleNewStudentSubmit = async (
  studentData: NewStudentRequest,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setStudentData: Dispatch<SetStateAction<any>>,
  voidForm: NewStudentRequest,
  openSnackbar: (severity: AlertColor, text: string) => void,
  apiUrl: string
): Promise<void> => {
  setIsLoading(true)
  try {
    const formData = new FormData()

    formData.append('name', JSON.stringify(studentData.name))
    formData.append('age', JSON.stringify(studentData.age))
    formData.append('gender', JSON.stringify(studentData.gender))
    formData.append('roomId', JSON.stringify(studentData.roomId))
    formData.append('siblings', JSON.stringify(studentData.siblings))
    formData.append('profileImage', studentData.profileImage as Blob)

    await axios.post<NewStudentRequest>(`${apiUrl}/students`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    setStudentData(voidForm)
    openSnackbar('success', 'Student created')
  } catch (error) {
    openSnackbar('error', error.response.data.message)
  }
  setIsLoading(false)
}

export default handleNewStudentSubmit
