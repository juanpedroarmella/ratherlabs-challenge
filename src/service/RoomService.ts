import { GetRoomByIdResponse } from './../types/interfaces/Room'
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
        roomName: room.name,
        students: studentsWithIdAndName
      }
    }

    return null
  }

  async findAll (): Promise<RoomModel[]> {
    return await this.roomRepository.findAll()
  }
}
