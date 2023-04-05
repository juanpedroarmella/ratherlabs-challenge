import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { RoomModel } from './RoomModel'
import { Blob } from 'buffer'

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

  @Column({
    type: DataTypes.BLOB,
    allowNull: false
  })
    profileImage!: Blob

  @ForeignKey(() => RoomModel)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  })
    roomId!: number

  @BelongsTo(() => RoomModel, {
    foreignKey: 'roomId',
    onDelete: 'SET NULL'
  })
    room!: typeof RoomModel
}
