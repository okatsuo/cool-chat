import { Query, Resolver } from 'type-graphql'
import { UserSchema } from '../schema/user-schema'

@Resolver(() => UserSchema)
export class UserResolver {
  @Query(() => [UserSchema])
  async users (): Promise<UserSchema[]> {
    return [{
      id: 1,
      email: 'rafael@mail.com',
      name: 'rafael',
      password: '123456789',
      created_at: new Date(),
      updated_at: new Date()
    }]
  }

  @Query(() => String)
  async login (): Promise<String> {
    return 'fake-token'
  }
}
