import { Op } from 'sequelize'
import { SiblingModel } from '../model/SiblingModel'

export class SiblingRepository {
  async findAllById (id: number): Promise<SiblingModel[]> {
    const siblings = await SiblingModel.findAll({
      where: {
        [Op.or]: [{ studentId: id }, { siblingId: id }]
      }
    })
    return siblings
  }

  async create (studentId: number, siblingId: number): Promise<SiblingModel> {
    return await SiblingModel.create({ studentId, siblingId })
  }

  async delete (studentId: number, siblingId: number): Promise<number> {
    const result = await SiblingModel.destroy({
      where: { studentId, siblingId }
    })
    return result
  }

  async update (studentId: number, siblingId: number): Promise<[number]> {
    const result = await SiblingModel.update(
      { studentId, siblingId },
      {
        where: {
          [Op.or]: [
            { studentId, siblingId },
            { siblingId: studentId, studentId: siblingId }
          ]
        }
      }
    )
    return result
  }
}
