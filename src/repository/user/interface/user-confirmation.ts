import { Field, InputType } from 'type-graphql'

@InputType()
export class UserConfirmationInputInterface {
  @Field()
  email: string

  @Field()
  password: string
}
