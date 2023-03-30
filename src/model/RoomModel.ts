import { DataTypes } from 'sequelize'
import { Model, Table, Column, HasMany } from 'sequelize-typescript'
import { StudentModel } from './StudentModel'

@Table({ tableName: 'rooms' })
export class RoomModel extends Model<RoomModel> {
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

  @HasMany(() => StudentModel, 'roomId')
  students!: typeof StudentModel[]
}
