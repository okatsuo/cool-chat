import { User } from '.prisma/client'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserCreateRepository, UserInputInterface, UsersRepository } from '../../repository/user'
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
}
