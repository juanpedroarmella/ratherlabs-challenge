import { AlertColor } from '@mui/material/Alert'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { EditStudentRequest } from './../../../../types/interfaces/Student'

const handleEditStudentSubmit = async (
  studentData: EditStudentRequest,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setStudentData: Dispatch<SetStateAction<any>>,
  voidForm: EditStudentRequest,
  openSnackbar: (severity: AlertColor, text: string) => void,
  apiUrl: string
): Promise<void> => {
  setIsLoading(true)
  try {
    const formData = new FormData()

    console.log(studentData.profileImage)

    formData.append('name', JSON.stringify(studentData.name))
    formData.append('age', JSON.stringify(studentData.age))
    formData.append('gender', JSON.stringify(studentData.gender))
    formData.append('roomId', JSON.stringify(studentData.roomId))
    formData.append('siblings', JSON.stringify(studentData.siblings))
    formData.append('profileImage', studentData.profileImage as Blob)

    await axios.put<EditStudentRequest>(
      `${apiUrl}/student/${studentData.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    setStudentData(voidForm)
    openSnackbar('success', 'Student edited')
  } catch (error) {
    openSnackbar('error', error.response.data.message)
  }
  setIsLoading(false)
}

export default handleEditStudentSubmit
