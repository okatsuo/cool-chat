import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { resolvers as generated_resolvers } from '@generated/type-graphql'
import { LoginResolver } from '../resolvers/login'
import { prisma } from '../../infra/prisma-client'
import { newMessage } from '../resolvers/new_message'
import { UserProfile } from '../resolvers/user-profile'
import { MessageResolver } from '../resolvers/message-create'
class Main {
  private PORT = process.env.PORT || 6767;

  async start () {
    const schema = await buildSchema({
      resolvers: [LoginResolver, newMessage, UserProfile, MessageResolver, ...generated_resolvers]
    })

    const server = new ApolloServer({
      schema,
      context: () => ({ prisma }),
      subscriptions: {
        path: '/subscription'
      }
    })
    await server.listen(this.PORT)
      .then(({ url }) => {
        console.log(`Hello ~ server running at ${url}`)
      })
  }
}

new Main().start()
