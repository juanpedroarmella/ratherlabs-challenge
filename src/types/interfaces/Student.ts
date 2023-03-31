import { StudentModel } from '@/model/StudentModel'

export interface Student {
  id: number
  name: string
}

export interface StudentById {
  student: StudentModel
  siblings: Student[]
}
