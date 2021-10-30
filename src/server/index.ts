import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server'

class Main {
  private PORT = 6767 || process.env.PORT;

  async start () {
    const server = new ApolloServer({
    })

    await server.listen(this.PORT)
      .then(({ url }) => {
        console.log(`Hello ~ server running at ${url}`)
      })
  }
}

new Main().start()
