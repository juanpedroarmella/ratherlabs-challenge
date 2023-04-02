import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { RoomModel } from './RoomModel'

@Table({ tableName: 'students' })
export class StudentModel extends Model {
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  })
    id!: number

  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
    name!: string

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  })
    age!: number

  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
    gender!: string

  @ForeignKey(() => RoomModel)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  })
    roomId!: number

  @BelongsTo(() => RoomModel, 'roomId')
    room!: typeof RoomModel
}
