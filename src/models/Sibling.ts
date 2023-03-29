import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Student } from './Student'

@Table({ tableName: 'siblings' })
export class Sibling extends Model<Sibling> {
  @ForeignKey(() => Student)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  })
  studentId!: number

  @ForeignKey(() => Student)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  })
  siblingId!: number

  @BelongsTo(() => Student, 'studentId')
  student!: Student

  @BelongsTo(() => Student, 'siblingId')
  sibling!: Student
}
