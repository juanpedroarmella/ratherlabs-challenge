import { StudentModel } from '@/model/StudentModel'
import { RoomModel } from '@/model/RoomModel'
import { SiblingModel } from '@/model/SiblingModel'

export class StudentRepository {
  async create (
    name: string,
    age: number,
    gender: string,
    roomId: number
  ): Promise<StudentModel> {
    const student = await StudentModel.create({
      name,
      age,
      gender,
      roomId
    })
    return student
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
    name: string,
    age: number,
    gender: string,
    roomId: number,
    siblingId?: number
  ): Promise<[number]> {
    const result = await StudentModel.update(
      { name, age, gender, roomId },
      { where: { id } }
    )
    return result
  }
}
