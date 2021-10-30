import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import { MessageResolver } from '../resolver/message-resolver'
import { buildSchema } from 'type-graphql'
import { ConnectionParamsInterface } from './protocol'
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
        onConnect: (connectionParams: ConnectionParamsInterface, webSocket, context) => {
          if (connectionParams.Authorization) {
            return console.log('a:', connectionParams.Authorization)
          }

          throw new Error('token is missing.')
        }
      }
    })
    await server.listen(this.PORT)
      .then(({ url }) => {
        console.log(`Hello ~ server running at ${url}`)
      })
  }
}

new Main().start()
