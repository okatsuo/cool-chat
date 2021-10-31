import { prisma } from '../prisma'

export const UserRepository = (email: string) => {
  try {
    return prisma.user.findFirst({ where: { email } })
  } catch (error) {
    throw new Error(error)
  }
}

export const UserByIdRepository = (id: number) => {
  try {
    return prisma.user.findFirst({ where: { id } })
  } catch (error) {
    throw new Error(error)
  }
}
