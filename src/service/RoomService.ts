import { StudentRepository } from './../repository/StudentRepository'
import { RoomModel } from '../model/RoomModel'
import { RoomRepository } from '@/repository/RoomRepository'
import { StudentModel } from '@/model/StudentModel'
import { Student } from '@/types/interfaces/Student'
import { RoomById } from '@/types/interfaces/Room'

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

  async findRoom (id: number): Promise<RoomById | null> {
    const room = await this.roomRepository.findById(id)
    const students = await this.studentRepository.findAllByRoomId(id)

    const studentsWithIdAndName: Student[] = students.map(({ id, name }) => ({
      id,
      name
    }))

    return room && studentsWithIdAndName
      ? {
          roomName: room.name,
          students: studentsWithIdAndName
        }
      : null
  }

  async findAll (): Promise<RoomModel[]> {
    return await this.roomRepository.findAll()
  }
}
