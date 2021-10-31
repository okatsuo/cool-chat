import { User } from '.prisma/client'
import { encrypt } from '../../infra/cryptografy'
import { prisma } from '../prisma'
import { UserInputInterface } from './interface'

export const UserCreateRepository = async (fields: UserInputInterface): Promise<User> => {
  try {
    const hashed_password = await encrypt(fields.password)
    const new_user = await prisma.user.create({ data: { ...fields, password: hashed_password } })
    return new_user
  } catch (error) {
    throw new Error(error)
  }
}
