import { Student } from './../types/interfaces/Student'
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
    roomId: number,
    siblings: Student[]
  ): Promise<StudentModel> {
    const student = await this.studentRepository.create(
      name,
      age,
      gender,
      roomId
    )
    siblings.map(async (sibling: Student) => {
      await this.siblingService.createSibling(student.id, sibling.id as number)
    })
    return student
  }

  async editStudent (
    id: number,
    name: string,
    age: number,
    gender: string,
    roomId: number,
    siblings: Student[]
  ): Promise<EditStudentResponse> {
    const updatedStudentCount = await this.studentRepository.update(
      id,
      name,
      age,
      gender,
      roomId
    )

    const deletedSiblingsCount = await this.deleteOldSiblings(id, siblings)

    const updatedSiblingsCount = await this.siblingService.updateOrAddSiblings(
      id,
      siblings
    )

    return {
      updatedStudentCount,
      updatedSiblingsCount,
      deletedSiblingsCount
    }
  }

  async getAllStudents (): Promise<StudentModel[]> {
    return await this.studentRepository.getAll()
  }

  async getStudentById (id: number): Promise<Student | null> {
    const student = await this.studentRepository.findById(id)
    if (student != null) {
      const siblings = await this.siblingService.findAllById(id)

      return {
        id: student.id,
        name: student.name,
        age: student.age,
        gender: student.gender,
        roomId: student.roomId,
        siblings
      }
    }

    return null
  }

  async deleteOldSiblings (id: number, siblings: Student[]): Promise<number> {
    const oldSiblingsArr = await this.siblingService.findAllById(id)

    const newSiblingsIds = siblings.map((sibling) => sibling.id)

    const siblingsToDelete = oldSiblingsArr.filter(
      (sibling: Student) => !newSiblingsIds.includes(sibling.id)
    )

    const deletedSiblingsCount = await Promise.all(
      siblingsToDelete.map(async (sibling) =>
        await this.siblingService.deleteSibling(id, sibling.id as number)
      )
    ).then((results) => results.length)

    return deletedSiblingsCount
  }
}
