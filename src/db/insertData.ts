import { RoomModel } from '../model/RoomModel'
import { SiblingModel } from '../model/SiblingModel'
import { StudentModel } from '../model/StudentModel'

export const insertData = async (): Promise<void> => {
  try {
    const rooms = await Promise.all(
      Array.from({ length: 10 }).map(async (_, index: number) => {
        const name = `Room ${index + 1}`
        return RoomModel.create({ name })
      })
    )

    const students = await Promise.all(
      Array.from({ length: 50 }).map(async (_, index: number) => {
        const name = `Student ${index + 1}`
        const age = Math.floor(Math.random() * 18) + 5
        const gender = Math.floor(Math.random()) === 0 ? 'Male' : 'Female'
        const roomId =
          rooms[Math.floor(Math.random() * rooms.length - 1) + 1].id
        return StudentModel.create({ name, age, gender, roomId })
      })
    )

    await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const student =
          students[Math.floor(Math.random() * students.length - 1) + 1]
        const sibling =
          students[Math.floor(Math.random() * students.length - 1) + 1]
        if (student.id !== sibling.id) {
          await SiblingModel.create({
            studentId: student.id,
            siblingId: sibling.id
          })
        }
      })
    )

    console.log('Data inserted')
  } catch (error) {
    console.error(error)
  }
}
