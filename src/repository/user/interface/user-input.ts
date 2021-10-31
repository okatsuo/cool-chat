import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInputInterface {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string
}
