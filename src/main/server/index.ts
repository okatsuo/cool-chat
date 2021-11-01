import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import { MessageResolver } from '../resolver/message-resolver'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '../resolver/user-resolver'

class Main {
  private PORT = process.env.PORT || 6767;

  async start () {
    const schema = await buildSchema({
      resolvers: [MessageResolver, UserResolver]
    })

    const server = new ApolloServer({
      schema,
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
