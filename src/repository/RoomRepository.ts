import { RoomModel } from '../model/RoomModel'

export class RoomRepository {
  async create (name: string): Promise<RoomModel> {
    return await RoomModel.create({ name })
  }

  async findById (id: number): Promise<RoomModel | null> {
    const room = await RoomModel.findByPk(id)
    return room
  }

  async findAll (): Promise<RoomModel[]> {
    const rooms = await RoomModel.findAll()
    return rooms
  }

  async update (id: number, name: string): Promise<[number]> {
    const result = await RoomModel.update({ name }, { where: { id } })
    return result
  }
}
