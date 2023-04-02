import { GetStudentByIdResponse } from './../types/interfaces/Student'
import { StudentModel } from '../model/StudentModel'
import { StudentRepository } from '@/repository/StudentRepository'
import { EditStudentResponse } from '@/types/interfaces/Student'
import { SiblingService } from './SiblingService'

export class StudentService {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly siblingService: SiblingService
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
    siblings: number[] = []
  ): Promise<EditStudentResponse> {
    const [updatedStudentRows] = await this.studentRepository.update(
      id,
      name,
      age,
      gender,
      roomId
    )

    const updatedSiblingsRows = await this.siblingService.editAllSiblings(
      id,
      siblings
    )

    return { updatedStudentRows, updatedSiblingsRows }
  }

  async getAllStudents (): Promise<StudentModel[]> {
    return await this.studentRepository.getAll()
  }

  async getStudentById (id: number): Promise<GetStudentByIdResponse | null> {
    const student = await this.studentRepository.findById(id)
    if (student != null) {
      const siblings = await this.siblingService.findAllById(id)

      return { student, siblings }
    }

    return null
  }
}
