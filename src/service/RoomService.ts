import {
  GetAllRoomsResponse,
  GetRoomByIdResponse
} from './../types/interfaces/Room'
import { StudentRepository } from './../repository/StudentRepository'
import { RoomModel } from '../model/RoomModel'
import { RoomRepository } from '@/repository/RoomRepository'
import { Student } from '@/types/interfaces/Student'

export class RoomService {
  constructor (
    private readonly roomRepository: RoomRepository,
    private readonly studentRepository: StudentRepository
  ) {}

  async createRoom (name: string): Promise<RoomModel> {
    return await this.roomRepository.create(name)
  }

  async editRoom (id: number, name: string): Promise<[number]> {
    return await this.roomRepository.update(id, name)
  }

  async findRoom (id: number): Promise<GetRoomByIdResponse | null> {
    const room = await this.roomRepository.findById(id)

    if (room != null) {
      const students = await this.studentRepository.findAllByRoomId(id)

      const studentsWithIdAndName: Student[] = students.map(({ id, name }) => ({
        id,
        name
      }))

      return {
        room: {
          name: room.name,
          id: room.id
        },
        students: studentsWithIdAndName
      }
    }

    return null
  }

  async findAll (): Promise<GetAllRoomsResponse> {
    return { rooms: await this.roomRepository.findAll() }
  }

  async deleteRoom (id: number): Promise<number> {
    return await this.roomRepository.delete(id)
  }
}
