import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import { MessageResolver } from '../resolver/message-resolver'
import { buildSchema } from 'type-graphql'

class Main {
  private PORT = process.env.PORT || 6767;

  async start () {
    console.log(process.env.PORT || 6767)

    const schema = await buildSchema({
      resolvers: [MessageResolver]
    })

    const server = new ApolloServer({
      schema
    })
    await server.listen(this.PORT)
      .then(({ url }) => {
        console.log(`Hello ~ server running at ${url}`)
      })
  }
}

new Main().start()
