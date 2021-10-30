import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class MessageSchema {
  @Field(() => Int)
  id: number

  @Field()
  message: String

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
