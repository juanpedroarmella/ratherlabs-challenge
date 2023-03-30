import { RoomModel } from '../model/RoomModel'
import { RoomRepository } from '@/repository/RoomRepository'

export class RoomService {
  constructor (private readonly roomRepository: RoomRepository) {}

  async createRoom (name: string): Promise<RoomModel> {
    return await this.roomRepository.create(name)
  }

  async editRoom (id: number, name: string): Promise<[number]> {
    return await this.roomRepository.update(id, name)
  }

  async findRoom (id: number): Promise<RoomModel | null> {
    return await this.roomRepository.findById(id)
  }

  async findAll (): Promise<RoomModel[]> {
    return await this.roomRepository.findAll()
  }
}
