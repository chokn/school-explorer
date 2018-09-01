const { ApolloServer } = require('apollo-server');

const {typeDefs, resolvers} = require('./schema.js') 

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) =>
    {console.log(`🚀  Server ready at ${url}`)});
