import { Field, ObjectType } from 'type-graphql'
import { MessageSchema } from './message-schema'

@ObjectType()
export class UserSchema {
  @Field()
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field(() => [MessageSchema])
  message: MessageSchema[]

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
