import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class MessageInputInterface {
  @Field(() => Int)
  user_id: number

  @Field()
  message: string
}
