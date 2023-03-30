import { SiblingModel } from '../model/SiblingModel'
import { SiblingRepository } from '@/repository/SiblingRepository'

export class SiblingService {
  constructor (private readonly siblingRepository: SiblingRepository) {}

  async createSibling (
    studentId: number,
    siblingId: number
  ): Promise<SiblingModel> {
    return await this.siblingRepository.create(studentId, siblingId)
  }

  async editSibling (studentId: number, siblingId: number): Promise<[number]> {
    return await this.siblingRepository.update(studentId, siblingId)
  }

  async deleteSibling (studentId: number, siblingId: number): Promise<number> {
    return await this.siblingRepository.delete(studentId, siblingId)
  }
}
