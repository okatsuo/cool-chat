import { Arg, Mutation, Query, Resolver } from 'type-graphql'
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
    @Arg('fields', () => MessageInputInterface) fields: MessageInputInterface
  ): Promise<MessageSchema> {
    return this.messagesRepository.messageCreate(fields)
  }
}
