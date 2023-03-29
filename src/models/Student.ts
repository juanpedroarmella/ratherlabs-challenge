import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Room } from './Room'
import { Sibling } from './Sibling'

@Table({ tableName: 'students' })
export class Student extends Model<Student> {
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

  @ForeignKey(() => Room)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  })
  roomId!: number

  @ForeignKey(() => Sibling)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  })
  siblingId?: number

  @BelongsTo(() => Room, 'roomId')
  room!: Room

  @HasMany(() => Sibling, 'studentId')
  siblings!: Sibling[]

  @BelongsTo(() => Sibling, 'siblingId')
  sibling!: Sibling
}
