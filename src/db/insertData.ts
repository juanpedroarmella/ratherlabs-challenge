import fs from 'fs'
import path from 'path'
import { RoomModel } from '../model/RoomModel'
import { SiblingModel } from '../model/SiblingModel'
import { StudentModel } from '../model/StudentModel'

export const insertData = async (): Promise<void> => {
  try {
    const rooms = await Promise.all(
      Array.from({ length: 10 }).map(async (_, index: number) => {
        const name = `Room ${index + 1}`
        return await RoomModel.create({ name })
      })
    )

    const students = await Promise.all(
      Array.from({ length: 50 }).map(async (_, index: number) => {
        const name = `Student ${index + 1}`
        const age = Math.floor(Math.random() * 18) + 5
        const gender = Math.floor(Math.random()) === 0 ? 'male' : 'female'
        const roomId =
          rooms[Math.floor(Math.random() * rooms.length - 1) + 1].id
        const profileImageFilePath = path.join(
          __dirname,
          '/../../public/profile-pic.svg'
        )
        const profileImage = Buffer.from(fs.readFileSync(profileImageFilePath))
        return await StudentModel.create({
          name,
          age,
          gender,
          roomId,
          profileImage
        })
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
            siblingId1: student.id,
            siblingId2: sibling.id
          })
        }
      })
    )
  } catch (error) {
    console.error(error)
  }
}
