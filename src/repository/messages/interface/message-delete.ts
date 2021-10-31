import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class MessageDeleteInputInterface {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  user_id: number
}
