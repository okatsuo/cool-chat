import { Arg, Ctx, Mutation, PubSub, PubSubEngine, Resolver } from 'type-graphql'
import { Message, MessageCreateInput } from '@generated/type-graphql'
import { Context } from './protocol'
import { topics } from '../../utils/constants'

Resolver(() => Message)
export class MessageResolver {
  @Mutation(() => Message)
  async createMessage (
    @PubSub() pubSub: PubSubEngine,
    @Arg('data') data: MessageCreateInput,
    @Ctx() { prisma }: Context
  ): Promise<Message> {
    const new_message = await prisma.message.create({ data })
    await pubSub.publish(topics.new_message, new_message)
    return new_message
  }
}
