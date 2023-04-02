import { StudentModel } from '@/model/StudentModel'

export interface Student {
  id: number
  name: string
}

export interface GetStudentByIdResponse {
  student: StudentModel
  siblings: Student[]
}

export interface EditStudentResponse {
  updatedStudentRows: number
  updatedSiblingsRows: number
}

export interface AddStudentRequest {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  roomId: number
  siblings: number[]
}
