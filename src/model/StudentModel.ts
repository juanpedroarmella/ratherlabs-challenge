import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { RoomModel } from './RoomModel'
import { SiblingModel } from './SiblingModel'

@Table({ tableName: 'students' })
export class StudentModel extends Model<StudentModel> {
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

  @ForeignKey(() => SiblingModel)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  })
  siblingId?: number

  @BelongsTo(() => RoomModel, 'roomId')
  room!: typeof RoomModel

  @HasMany(() => SiblingModel, 'studentId')
  siblings!: typeof SiblingModel[]

  @BelongsTo(() => SiblingModel, 'siblingId')
  sibling!: typeof SiblingModel
}
