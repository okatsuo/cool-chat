import { Resolver, Subscription } from 'type-graphql'
import { topics } from '../../utils/constants'

@Resolver()
export class newMessage {
  @Subscription(() => String, { topics: topics.new_message })
  async newMessage () {
    return 'salve'
  }
}
