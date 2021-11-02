import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { makeAccessToken } from '../../infra/access-token'
import { error } from '../../utils/errors'
import { LoginSchema } from '../schema/login'
import { Context } from './protocol'

@Resolver(of => LoginSchema)
export class LoginResolver {
  @Query(() => LoginSchema)
  async login (
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { prisma }: Context
  ): Promise<any> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || user.password !== password) throw new Error(error.invalid_credentials)
    const token = makeAccessToken(user)
    return { token, user }
  }
}
