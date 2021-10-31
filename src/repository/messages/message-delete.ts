import { MessageDeleteInputInterface } from '.'
import { error } from '../../utils/errors'
import { prisma } from '../prisma'

export const MessageDeleteRepository = async (fields: MessageDeleteInputInterface): Promise<boolean> => {
  try {
    const { id, user_id } = fields
    const message = await prisma.message.findFirst({ where: { id, user_id } })

    if (!message) throw new Error(error.not_message_owner)

    const deleted_message = await prisma.message.delete({ where: { id } })
    if (!deleted_message) return false
    return true
  } catch (err) {
    if (err.message === error.not_message_owner) {
      throw new Error(err)
    }
    return false
  }
}
