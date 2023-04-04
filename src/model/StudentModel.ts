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
    allowNull: false,
    validate: {
      isGreaterThanThree (value: number) {
        if (value < 3) {
          throw new Error('Age must be greater than 3')
        }
      }
    }
  })
    age!: number

  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
    gender!: 'male' | 'female' | 'other'

  @ForeignKey(() => RoomModel)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  })
    roomId!: number

  @BelongsTo(() => RoomModel, 'roomId')
    room!: typeof RoomModel
}
