import { User } from '.prisma/client'
import { prisma } from '../prisma'

export const UsersRepository = async (): Promise<User[]> => {
  try {
    return await prisma.user.findMany()
  } catch (error) {
    throw new Error(error)
  }
}
