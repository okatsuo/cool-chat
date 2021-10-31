import { User } from '.prisma/client'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserCreateRepository, UserInputInterface, UsersRepository } from '../../repository/user'
import { UserConfirmationInputInterface } from '../../repository/user/interface'
import { LoginRepository } from '../../repository/user/login'
import { UserDeleteRepository } from '../../repository/user/user-delete'
import { UserSchema } from '../schema/user-schema'

@Resolver(() => UserSchema)
export class UserResolver {
  @Query(() => [UserSchema])
  async users (): Promise<User[]> {
    return UsersRepository()
  }

  @Query(() => String)
  async login (
    @Arg('fields', () => UserConfirmationInputInterface) fields: UserConfirmationInputInterface
  ): Promise<string> {
    return LoginRepository(fields)
  }

  @Mutation(() => UserSchema)
  async userCreate (
    @Arg('fields', () => UserInputInterface) fields: UserInputInterface
  ): Promise<User> {
    return UserCreateRepository(fields)
  }

  @Mutation(() => Boolean)
  async userDelete (
    @Arg('fields', () => UserConfirmationInputInterface) fields: UserConfirmationInputInterface
  ): Promise<boolean> {
    return await UserDeleteRepository(fields)
  }
}
