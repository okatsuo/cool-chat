import { Message } from '.prisma/client'
import { prisma } from '../prisma'
import { MessageInputInterface } from './interface'

export const MessageCreateRepository = async (fields: MessageInputInterface): Promise<Message> => {
  try {
    const new_message = await prisma.message.create({ data: fields })
    return new_message
  } catch (error) {
    throw new Error(error)
  }
}
