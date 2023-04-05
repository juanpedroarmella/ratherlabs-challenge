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
    siblingId1!: number

  @ForeignKey(() => StudentModel)
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  })
    siblingId2!: number

  @BelongsTo(() => StudentModel, {
    onDelete: 'CASCADE',
    foreignKey: 'siblingId1'
  })
    student!: typeof StudentModel

  @BelongsTo(() => StudentModel, {
    onDelete: 'CASCADE',
    foreignKey: 'siblingId2'
  })
    sibling!: typeof StudentModel
}
