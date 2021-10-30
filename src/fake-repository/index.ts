import { Field, InputType } from 'type-graphql'
import { MessageSchema } from '../main/schema/message-schema'

@InputType()
export class MessageInputInterface {
  @Field()
  message: String
}

export class MessageRepository {
  private messages_data:MessageSchema[] = [{ id: 0, message: 'the first message!', created_at: new Date(), updated_at: new Date() }];

  async messages (): Promise<MessageSchema[]> {
    return this.messages_data
  }

  async messageCreate ({ message }: MessageInputInterface): Promise<MessageSchema> {
    const new_data = { created_at: new Date(), updated_at: new Date() }
    const id = this.messages_data.length
    const new_message = { id, message, ...new_data }
    this.messages_data.push(new_message)
    return new_message
  }
}
