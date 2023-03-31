import { SiblingRepository } from '@/repository/SiblingRepository'
import { StudentModel } from '../model/StudentModel'
import { StudentRepository } from '@/repository/StudentRepository'
import { StudentById } from '@/types/interfaces/Student'

export class StudentService {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly siblingRepository: SiblingRepository
  ) {}

  async createStudent (
    name: string,
    age: number,
    gender: string,
    roomId: number
  ): Promise<StudentModel> {
    return await this.studentRepository.create(name, age, gender, roomId)
  }

  async editStudent (
    id: number,
    name: string,
    age: number,
    gender: string,
    roomId: number,
    siblingId?: number
  ): Promise<[number]> {
    return await this.studentRepository.update(
      id,
      name,
      age,
      gender,
      roomId,
      siblingId
    )
  }

  async getAllStudents (): Promise<StudentModel[]> {
    return await this.studentRepository.getAll()
  }

  async getStudentById (id: number): Promise<StudentById | null> {
    const student = await this.studentRepository.findById(id)
    if (student) {
      const siblings = await this.siblingRepository.findAllById(id)

      const siblingNames = await Promise.all(
        siblings.map(async (sibling) => {
          const idToSearch =
            id === sibling.siblingId ? sibling.studentId : sibling.siblingId

          const siblingStudent = await this.studentRepository.findById(
            idToSearch
          )

          return {
            id: siblingStudent.id,
            name: siblingStudent.name
          }
        })
      )

      return { student, siblings: siblingNames }
    }

    return null
  }
}
