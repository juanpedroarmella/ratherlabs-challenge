import { Student } from './Student'

export interface Room {
  id: number
  name: string
}

export interface GetRoomByIdResponse {
  roomName: string
  students: Student[]
}

export interface AddRoomRequest {
  name: string
}
