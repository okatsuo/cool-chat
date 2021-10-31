import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import { MessageResolver } from '../resolver/message-resolver'
import { buildSchema } from 'type-graphql'
import { ConnectionParamsInterface } from './protocol'
import { UserResolver } from '../resolver/user-resolver'
import { verifyAcessToken } from '../../infra/access-token'
import { UserRepository } from '../../repository/user/user'

class Main {
  private PORT = process.env.PORT || 6767;

  async start () {
    const schema = await buildSchema({
      resolvers: [MessageResolver, UserResolver]
    })

    const server = new ApolloServer({
      schema,
      subscriptions: {
        onConnect: async ({ Authorization }: ConnectionParamsInterface, webSocket, context) => {
          if (Authorization) {
            const { email } = verifyAcessToken(Authorization)
            const user_exist = await UserRepository(email)
            if (!user_exist) throw new Error('not authorized')
            return true
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
