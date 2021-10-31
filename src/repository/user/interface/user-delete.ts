import { Field, InputType } from 'type-graphql'

@InputType()
export class UserDeleteInputInterface {
  @Field()
  email: string

  @Field()
  password: string
}
