import { Message } from '.prisma/client'
import { Arg, FieldResolver, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from 'type-graphql'
import { UserByIdRepository } from '../../repository/user/user'
import { topics } from '../../utils/constants'
import { MessageSchema } from '../schema/message-schema'
import {
  MessageDeleteInputInterface,
  MessageInputInterface,
  MessageCreateRepository,
  MessageDeleteRepository,
  MessagesRepository
} from '../../repository/messages'

@Resolver(MessageSchema)
export class MessageResolver {
  @FieldResolver()
  user (@Root() message: Message) {
    return UserByIdRepository(message.user_id)
  }

  @Query(() => [MessageSchema])
  async messages (): Promise<Message[]> {
    return MessagesRepository()
  }

  @Mutation(() => MessageSchema)
  async messageCreate (
    @Arg('fields', () => MessageInputInterface) fields: MessageInputInterface,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Message> {
    const new_message = await MessageCreateRepository(fields)
    await pubSub.publish(topics.new_message, new_message)
    return new_message
  }

  @Mutation(() => Boolean)
  async messageDelete (
    @Arg('fields', () => MessageDeleteInputInterface) fields: MessageDeleteInputInterface
  ): Promise<boolean> {
    return await MessageDeleteRepository(fields)
  }

  @Subscription(() => MessageSchema, { topics: topics.new_message })
  async newMessage (
    @Root() new_message: Message
  ): Promise<Message> {
    return new_message
  }
}
