import { Message } from '.prisma/client'
import { prisma } from '../prisma'

export const UserMessageRepository = async (user_id: number): Promise<Message[]> => {
  try {
    const user_message = await prisma.message.findMany({ where: { user_id } })
    return user_message
  } catch (error) {
    throw new Error(error)
  }
}
