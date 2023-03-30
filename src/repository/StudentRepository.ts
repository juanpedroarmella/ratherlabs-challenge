import { RoomModel } from '@/model/RoomModel'
import { SiblingModel } from '@/model/SiblingModel'
import { StudentModel } from '../model/StudentModel'

export class StudentRepository {
  async create (
    name: string,
    age: number,
    gender: string,
    roomId: number,
    siblingId?: number
  ): Promise<StudentModel> {
    const student = await StudentModel.create({
      name,
      age,
      gender,
      roomId,
      siblingId
    })
    return student
  }

  async findById (id: number): Promise<StudentModel | null> {
    const student = await StudentModel.findByPk(id, {
      include: [RoomModel, SiblingModel]
    })
    return student
  }

  async update (
    id: number,
    name: string,
    age: number,
    gender: string,
    roomId: number,
    siblingId?: number
  ): Promise<[number]> {
    const result = await StudentModel.update(
      { name, age, gender, roomId, siblingId },
      { where: { id } }
    )
    return result
  }
}
