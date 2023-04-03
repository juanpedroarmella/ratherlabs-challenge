import { Op } from 'sequelize'
import { SiblingModel } from '../model/SiblingModel'

export class SiblingRepository {
  async findAllById (id: number): Promise<SiblingModel[]> {
    const siblings = await SiblingModel.findAll({
      where: {
        [Op.or]: [{ siblingId1: id }, { siblingId2: id }]
      }
    })
    return siblings
  }

  async create (siblingId1: number, siblingId2: number): Promise<SiblingModel> {
    return await SiblingModel.create({ siblingId1, siblingId2 })
  }

  async delete (siblingId1: number, siblingId2: number): Promise<number> {
    const result = await SiblingModel.destroy({
      where: { siblingId1, siblingId2 }
    })
    return result
  }

  async update (siblingId1: number, siblingId2: number): Promise<[number]> {
    const result = await SiblingModel.update(
      { siblingId1, siblingId2 },
      {
        where: {
          [Op.or]: [
            { siblingId1, siblingId2 },
            { siblingId1: siblingId2, siblingId2: siblingId1 }
          ]
        }
      }
    )
    return result
  }
}
