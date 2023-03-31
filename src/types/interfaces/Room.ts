import { RoomModel } from '@/model/RoomModel'
import { Student } from './Student'

export interface Room {
  id: number
  name: string
}

export interface RoomById {
  roomName: string
  students: Student[]
}
