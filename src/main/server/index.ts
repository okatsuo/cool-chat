import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { PrismaClient } from '@prisma/client'
import { resolvers } from '@generated/type-graphql'
import { LoginResolver } from '../resolvers/login'
class Main {
  private PORT = process.env.PORT || 6767;

  async start () {
    const schema = await buildSchema({
      resolvers: [LoginResolver, ...resolvers]
    })
    const prisma = new PrismaClient()

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
