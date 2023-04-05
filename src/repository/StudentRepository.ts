import { StudentModel } from '@/model/StudentModel'
import { SiblingModel } from '@/model/SiblingModel'
import { Op } from 'sequelize'

export class StudentRepository {
  async create (
    name: string,
    age: number,
    gender: string,
    roomId: number | null,
    profileImage: Blob
  ): Promise<StudentModel> {
    return await StudentModel.create({
      name,
      age,
      gender,
      roomId,
      profileImage
    })
  }

  async getAll (): Promise<StudentModel[]> {
    return await StudentModel.findAll()
  }

  async findById (id: number): Promise<StudentModel | null> {
    const student = await StudentModel.findByPk(id)
    return student
  }

  async findAllByRoomId (id: number): Promise<StudentModel[]> {
    const student = await StudentModel.findAll({ where: { roomId: id } })
    return student
  }

  async update (
    id: number,
    name: string | null,
    age: number | null,
    gender: string | null,
    roomId: number | null,
    profileImage: Blob | null
  ): Promise<[number]> {
    const fieldsToUpdate = {
      name,
      age,
      gender,
      profileImage,
      roomId
    }

    Object.keys(fieldsToUpdate).forEach((key) =>
      fieldsToUpdate[key] === null ? delete fieldsToUpdate[key] : {}
    )

    fieldsToUpdate.roomId = roomId // because roomId can be null on the db

    const result = await StudentModel.update(fieldsToUpdate, { where: { id } })

    return result
  }

  async delete (id: number): Promise<number> {
    return await SiblingModel.destroy({
      where: { [Op.or]: [{ siblingId1: id }, { siblingId2: id }] }
    })
  }
}
