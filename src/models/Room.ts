import { DataTypes } from 'sequelize'
import { Model, Table, Column, HasMany } from 'sequelize-typescript'
import { Student } from './Student'

@Table({ tableName: 'rooms' })
export class Room extends Model<Room> {
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

  @HasMany(() => Student, 'roomId')
  students!: Student[]
}
