import { RoomService } from '@/service/RoomService'
import {
  GetAllStudentsResponse,
  GetStudentByIdResponse,
  Student
} from './../types/interfaces/Student'
import { StudentModel } from '../model/StudentModel'
import { StudentRepository } from '@/repository/StudentRepository'
import { EditStudentResponse } from '@/types/interfaces/Student'
import { SiblingService } from './SiblingService'
import getBufferExtension from '@/utils/getBufferExtension'

export class StudentService {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly siblingService: SiblingService,
    private readonly roomService: RoomService
  ) {}

  async createStudent (
    name: string,
    age: number,
    gender: string,
    roomId: number | null,
    siblings: Student[],
    profileImage: Blob
  ): Promise<StudentModel> {
    const student = await this.studentRepository.create(
      name,
      age,
      gender,
      roomId,
      profileImage
    )
    siblings.map(async (sibling: Student) => {
      await this.siblingService.createSibling(student.id, sibling.id)
    })
    return student
  }

  async editStudent (
    id: number,
    name: string | null,
    age: number | null,
    gender: string | null,
    roomId: number | null,
    siblings: Student[],
    imageProfile: Blob | null
  ): Promise<EditStudentResponse> {
    const [updatedStudentCount] = await this.studentRepository.update(
      id,
      name,
      age,
      gender,
      roomId,
      imageProfile
    )

    const deletedSiblingsCount = await this.deleteOldSiblings(id, siblings)

    const updatedSiblingsCount = await this.siblingService.updateOrAddSiblings(
      id,
      siblings
    )

    return {
      updatedStudentCount,
      updatedSiblingsCount,
      deletedSiblingsCount
    }
  }

  async getAllStudents (): Promise<GetAllStudentsResponse> {
    const students = await this.studentRepository.getAll()
    const studentsWithoutProfileImage = students.map((student) => {
      return {
        id: student.id,
        name: student.name
      }
    })

    return { students: studentsWithoutProfileImage }
  }

  async getStudentById (id: number): Promise<GetStudentByIdResponse | null> {
    const student = await this.studentRepository.findById(id)
    if (student != null) {
      const siblings = await this.siblingService.findAllById(id)
      const findRoom = await this.roomService.findRoom(student.roomId)

      return {
        id: student.id,
        name: student.name,
        age: student.age,
        gender: student.gender,
        room:
          findRoom != null
            ? { name: findRoom.room.name, id: findRoom.room.id }
            : null,
        profileImage: {
          data: student.profileImage,
          ext: await getBufferExtension(
            student.profileImage as unknown as Buffer
          )
        } as any,
        siblings
      }
    }

    return null
  }

  async deleteOldSiblings (id: number, siblings: Student[]): Promise<number> {
    const oldSiblingsArr = await this.siblingService.findAllById(id)

    const newSiblingsIds = siblings.map((sibling) => sibling.id)

    const siblingsToDelete = oldSiblingsArr.filter(
      (sibling: Student) => !newSiblingsIds.includes(sibling.id)
    )

    const deletedSiblingsCount = await Promise.all(
      siblingsToDelete.map(
        async (sibling) =>
          await this.siblingService.deleteSibling(id, sibling.id)
      )
    ).then((results) => results.length)

    return deletedSiblingsCount
  }

  async deleteStudent (id: number): Promise<number> {
    return await this.studentRepository.delete(id)
  }
}
