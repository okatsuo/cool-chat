import { User } from '.prisma/client'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { UserSchema } from '../schema/user-schema'
import {
  UserConfirmationInputInterface,
  UserCreateRepository,
  UserInputInterface,
  UsersRepository,
  LoginRepository,
  UserDeleteRepository
} from '../../repository/user'
import { UserMessageRepository } from '../../repository/user/user-message'

@Resolver(() => UserSchema)
export class UserResolver {
  @FieldResolver()
  message (@Root() user: User) {
    return UserMessageRepository(user.id)
  }

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
