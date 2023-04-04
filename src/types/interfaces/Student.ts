export interface Student {
  id?: number
  name: string
  age?: number
  gender?: 'male' | 'female' | 'other'
  roomId?: number
  siblings?: Student[]
}
export interface EditStudentResponse {
  updatedStudentCount: [number]
  deletedSiblingsCount: number
  updatedSiblingsCount: number
}
