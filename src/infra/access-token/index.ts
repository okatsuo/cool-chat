import { User } from '.prisma/client'
import { sign, verify } from 'jsonwebtoken'
import { constants } from '../../utils/constants'
import { UserAccessTokenInterface } from './interface'

export const makeAccessToken = async (user: User) => {
  const user_data: UserAccessTokenInterface = {
    id: user.id,
    email: user.email
  }
  return sign(user_data, constants.secret_token, { expiresIn: constants.token_expiration })
}

export const verifyAcessToken = (access_token: string): UserAccessTokenInterface => {
  const token = access_token.split(' ')[1]
  const decoded = verify(token, constants.secret_token) as UserAccessTokenInterface
  return decoded
}
