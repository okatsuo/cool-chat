import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserSchema {
  @Field()
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
