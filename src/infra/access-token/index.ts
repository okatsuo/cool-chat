import { User } from '.prisma/client'
import { sign, verify } from 'jsonwebtoken'
import { constants } from '../../utils/constants'

export interface UserAccessTokenInterface {
  id: number
  email: string
}

export const makeAccessToken = (user: User) => {
  const user_data: UserAccessTokenInterface = {
    id: user.id,
    email: user.email
  }
  return sign(user_data, constants.secret_token, { expiresIn: constants.token_expiration })
}

export const verifyAcessToken = async (access_token: string) => {
  const payload = verify(access_token, constants.secret_token)
  console.log(payload) // TODO ver como fazer uma tipagem aqui
}
