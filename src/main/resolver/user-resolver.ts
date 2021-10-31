import { User } from '.prisma/client'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserSchema } from '../schema/user-schema'
import {
  UserConfirmationInputInterface,
  UserCreateRepository,
  UserInputInterface,
  UsersRepository,
  LoginRepository,
  UserDeleteRepository
} from '../../repository/user'

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
