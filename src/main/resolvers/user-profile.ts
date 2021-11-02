import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { User } from '@generated/type-graphql'
import { Context } from './protocol'
import { verifyAcessToken } from '../../infra/access-token'
@Resolver()
export class UserProfile {
  @Query(() => User)
  async userProfile (
    @Arg('token') token: string,
    @Ctx() { prisma }: Context
  ): Promise<User> {
    const { email } = await verifyAcessToken(token)
    return await prisma.user.findUnique({ where: { email } })
  }
}
