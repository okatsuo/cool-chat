import { Resolver, Root, Subscription } from 'type-graphql'
import { topics } from '../../utils/constants'
import { Message } from '@generated/type-graphql'

@Resolver(() => Message)
export class newMessage {
  @Subscription(() => Message, { topics: topics.new_message })
  async newMessage (
    @Root() message: Message
  ): Promise<Message> {
    return message
  }
}
