import { StudentModel } from '../model/StudentModel'
import { StudentRepository } from '@/repository/StudentRepository'

export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}
  async createStudent(
    name: string,
    age: number,
    gender: string,
    roomId: number,
    siblingId?: number
  ): Promise<StudentModel> {
    return this.studentRepository.create(name, age, gender, roomId, siblingId)
  }

  async editStudent(
    id: number,
    name: string,
    age: number,
    gender: string,
    roomId: number,
    siblingId?: number
  ): Promise<[number]> {
    return this.studentRepository.update(
      id,
      name,
      age,
      gender,
      roomId,
      siblingId
    )
  }
}
