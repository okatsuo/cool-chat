import { Field, ObjectType } from 'type-graphql'
import { User } from '@generated/type-graphql'

@ObjectType()
export class LoginSchema {
  @Field()
  token: string

  @Field(() => User)
  user: User
}
