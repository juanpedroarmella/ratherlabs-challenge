import { Student } from '@/types/interfaces/Student'
import { StudentRepository } from '@/repository/StudentRepository'
import { SiblingModel } from '../model/SiblingModel'
import { SiblingRepository } from '@/repository/SiblingRepository'

export class SiblingService {
  constructor (
    private readonly siblingRepository: SiblingRepository,
    private readonly studentRepository: StudentRepository
  ) {}

  async createSibling (
    studentId: number,
    siblingId: number
  ): Promise<SiblingModel> {
    return await this.siblingRepository.create(studentId, siblingId)
  }

  async editOneSibling (
    studentId: number,
    siblingId: number
  ): Promise<[number]> {
    return await this.siblingRepository.update(studentId, siblingId)
  }

  async updateOrAddSiblings (
    studentId: number,
    siblings: Student[]
  ): Promise<number> {
    const siblingUpdates = siblings.map(async (student) => {
      const [affectedRows] = await this.siblingRepository.update(
        studentId,
        student.id
      )

      if (affectedRows === 0) {
        await this.createSibling(studentId, student.id)
        return 1
      }
      return affectedRows
    })

    const updatedSiblingsRows = (await Promise.all(siblingUpdates)).reduce(
      (total, affectedRows) => total + affectedRows,
      0
    )

    return updatedSiblingsRows
  }

  async findAllById (id: number): Promise<Student[] | []> {
    const siblings = await this.siblingRepository.findAllById(id)

    const siblingsWithName: Student[] = []

    for (const sibling of siblings) {
      const idToSearch =
        id === sibling.siblingId1 ? sibling.siblingId2 : sibling.siblingId1

      const siblingStudent = await this.studentRepository.findById(idToSearch)

      if (siblingStudent !== null) {
        siblingsWithName.push({
          id: siblingStudent.id,
          name: siblingStudent.name
        })
      }
    }

    return siblingsWithName
  }

  async deleteSibling (siblingId1: number, siblingId2: number): Promise<number> {
    return await this.siblingRepository.delete(siblingId1, siblingId2)
  }
}
