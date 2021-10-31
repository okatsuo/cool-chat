import { Field, Int, ObjectType } from 'type-graphql'
import { UserSchema } from './user-schema'

@ObjectType()
export class MessageSchema {
  @Field(() => Int)
  id: number

  @Field(() => UserSchema)
  user: UserSchema

  @Field()
  message: String

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
