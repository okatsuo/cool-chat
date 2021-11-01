import { makeAccessToken } from '../../infra/access-token'
import { compare_hash } from '../../infra/cryptografy'
import { error } from '../../utils/errors'
import { prisma } from '../prisma'
import { UserConfirmationInputInterface } from './interface'

export const LoginRepository = async ({ email, password }: UserConfirmationInputInterface): Promise<string> => {
  try {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) throw (error.invalid_credentials)
    const is_valid_password = await compare_hash(password, user.password)
    if (!is_valid_password) throw (error.invalid_credentials)
    const token = await makeAccessToken(user)
    return token
  } catch (error) {
    throw new Error(error)
  }
}
