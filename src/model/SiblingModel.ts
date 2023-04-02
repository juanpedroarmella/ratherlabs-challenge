import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { StudentModel } from './StudentModel'

@Table({ tableName: 'siblings' })
export class SiblingModel extends Model {
  @ForeignKey(() => StudentModel)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  })
    studentId!: number

  @ForeignKey(() => StudentModel)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  })
    siblingId!: number

  @BelongsTo(() => StudentModel, 'studentId')
    student!: typeof StudentModel

  @BelongsTo(() => StudentModel, 'siblingId')
    sibling!: typeof StudentModel
}
