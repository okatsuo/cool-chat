import { User } from '.prisma/client'
import { prisma } from '../prisma'
import { UserInputInterface } from './protocol'

export const UserCreateRepository = async (fields: UserInputInterface): Promise<User> => {
  try {
    const new_user = await prisma.user.create({ data: fields })
    return new_user
  } catch (error) {
    throw new Error(error)
  }
}
