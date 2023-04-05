import { Room } from './Room'

export interface GetStudentByIdResponse {
  id: number
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  room: Room | null
  siblings: Student[]
  profileImage: ImageInfo
}

export interface GetAllStudentsResponse {
  students: Student[]
}

export interface Student {
  id: number
  name: string
}

export interface NewStudentRequest {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  roomId: number | null
  siblings: Student[]
  profileImage: Blob | null
}

export interface ImageInfo {
  data: {
    data: number[]
    type: string
  }
  ext: string
}

export interface EditStudentRequest {
  id: number
  name: string | null
  age: number | null
  gender: 'male' | 'female' | 'other' | null
  roomId: number | null
  siblings: Student[]
  profileImage?: ImageInfo | Blob | null
}

export interface EditStudentResponse {
  updatedStudentCount: number
  updatedSiblingsCount: number
  deletedSiblingsCount: number
}
