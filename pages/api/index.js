import { ApolloServer } from 'apollo-server-micro'
import mongoose from 'mongoose'
import cookies from '../../../cookieHelper.js'

import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to Database'))

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
    uploads: {
        maxFileSize: 10000000,
        maxFiles: 20,
    },
})

export const config = {
    api: { bodyParser: false },
}

export default cookies(
    apolloServer.createHandler({
        path: '/api/graphql',
    })
)
