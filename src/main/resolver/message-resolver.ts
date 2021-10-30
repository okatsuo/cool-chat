import { Arg, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from 'type-graphql'
import { MessageInputInterface, MessageRepository } from '../../fake-repository'
import { MessageSchema } from '../schema/message-schema'

@Resolver(MessageSchema)
export class MessageResolver {
  private messagesRepository = new MessageRepository()

  @Query(() => [MessageSchema])
  async messages (): Promise<MessageSchema[]> {
    return this.messagesRepository.messages()
  }

  @Mutation(() => MessageSchema)
  async messageCreate (
    @Arg('fields', () => MessageInputInterface) fields: MessageInputInterface,
    @PubSub() pubSub: PubSubEngine
  ): Promise<MessageSchema> {
    const new_message = await this.messagesRepository.messageCreate(fields)
    await pubSub.publish('new_message', new_message)
    return new_message
  }

  @Subscription(() => MessageSchema, { topics: 'new_message' })
  async newMessage (
    @Root() new_message: MessageSchema
  ): Promise<MessageSchema> {
    return new_message
  }
}
