import { User } from '.prisma/client'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserCreateRepository, UserInputInterface, UsersRepository } from '../../repository/user'
import { UserDeleteInputInterface } from '../../repository/user/interface'
import { UserDeleteRepository } from '../../repository/user/user-delete'
import { UserSchema } from '../schema/user-schema'

@Resolver(() => UserSchema)
export class UserResolver {
  @Query(() => [UserSchema])
  async users (): Promise<User[]> {
    return UsersRepository()
  }

  @Query(() => String)
  async login (): Promise<String> {
    return 'fake-token'
  }

  @Mutation(() => UserSchema)
  async userCreate (
    @Arg('fields', () => UserInputInterface) fields: UserInputInterface
  ): Promise<User> {
    return UserCreateRepository(fields)
  }

  @Mutation(() => Boolean)
  async userDelete (
    @Arg('fields', () => UserDeleteInputInterface) fields:UserDeleteInputInterface
  ): Promise<boolean> {
    return await UserDeleteRepository(fields)
  }
}
