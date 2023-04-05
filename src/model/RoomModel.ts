import { DataTypes } from 'sequelize'
import { Model, Table, Column, HasMany } from 'sequelize-typescript'
import { StudentModel } from './StudentModel'

@Table({ tableName: 'rooms' })
export class RoomModel extends Model {
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

  @HasMany(() => StudentModel, {
    foreignKey: 'roomId',
    onDelete: 'SET NULL'
  })
    students!: Array<typeof StudentModel>
}
