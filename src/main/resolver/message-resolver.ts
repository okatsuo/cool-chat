import { Query, Resolver } from 'type-graphql'
import { MessageSchema } from '../schema/message-schema'

@Resolver(MessageSchema)
export class MessageResolver {
  @Query(() => MessageSchema)
  async messages (): Promise<MessageSchema> {
    return { id: 1, message: 'vamo que vamo!', created_at: new Date(), updated_at: new Date() }
  }
}
