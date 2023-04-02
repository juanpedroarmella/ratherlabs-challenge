import { RoomModel } from '@/model/RoomModel'
import { SiblingModel } from '@/model/SiblingModel'
import { StudentModel } from '@/model/StudentModel'
import sequelize from './db'

const sync = async (): Promise<void> => {
  await sequelize.sync()
  sequelize.addModels([StudentModel, RoomModel, SiblingModel])
}

export default sync
