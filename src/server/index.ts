import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server'

class Main {
  private PORT = process.env.PORT || 6767;

  async start () {
    console.log(process.env.PORT || 6767)
    const server = new ApolloServer({
    })
    await server.listen(this.PORT)
      .then(({ url }) => {
        console.log(`Hello ~ server running at ${url}`)
      })
  }
}

new Main().start()
