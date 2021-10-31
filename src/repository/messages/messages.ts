import { Message } from '.prisma/client'
import { prisma } from '../prisma'

export const MessagesRepository = async (): Promise<Message[]> => {
  try {
    const messages = await prisma.message.findMany()
    return messages
  } catch (error) {
    throw new Error(error)
  }
}
