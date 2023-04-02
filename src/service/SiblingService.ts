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

  async editAllSiblings (
    studentId: number,
    siblings: number[]
  ): Promise<number> {
    const siblingUpdates = siblings.map(async (siblingId) => {
      const [affectedRows] = await this.siblingRepository.update(
        studentId,
        siblingId
      )
      return affectedRows
    })

    const updatedSiblingsRows = (await Promise.all(siblingUpdates)).reduce(
      (total, affectedRows) => total + affectedRows,
      0
    )

    return updatedSiblingsRows[0]
  }

  async findAllById (id: number): Promise<Student[] | []> {
    const siblings = await this.siblingRepository.findAllById(id)

    const siblingsWithName: Student[] = []

    for (const sibling of siblings) {
      const idToSearch =
        id === sibling.siblingId ? sibling.studentId : sibling.siblingId

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

  async deleteSibling (studentId: number, siblingId: number): Promise<number> {
    return await this.siblingRepository.delete(studentId, siblingId)
  }
}
