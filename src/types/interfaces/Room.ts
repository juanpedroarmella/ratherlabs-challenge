export interface Room {
  id: number
  name: string
}
export interface GetRoomByIdResponse {
  room: Room
  students: Array<{
    id: number
    name: string
  }>
}

export interface GetAllRoomsResponse {
  rooms: Room[]
}

export interface AddRoomRequest {
  name: string
}

export interface EditRoomRequest {
  id: number
  name: string
}
