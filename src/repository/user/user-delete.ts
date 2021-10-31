import { compare_hash } from '../../infra/cryptografy'
import { prisma } from '../prisma'
import { UserConfirmationInputInterface } from './interface'

export const UserDeleteRepository = async (fields: UserConfirmationInputInterface): Promise<boolean> => {
  try {
    const { email, password } = fields
    const user = await prisma.user.findFirst({ where: { email } })
    const is_valid_password = await compare_hash(password, user.password)
    if (!is_valid_password) throw new Error('Incorrect password..')

    await prisma.user.delete({ where: { email } })
    return true
  } catch (error) {
    return false
  }
}
