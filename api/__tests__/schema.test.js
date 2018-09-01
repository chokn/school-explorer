const {
    makeExecutableSchema,
    addMockFunctionsToSchema
  } = require('graphql-tools')

const { graphql } = require('graphql')
  
const {
    typeDefs,
    resolvers
} = require('../schema')  

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

it('gets all schools', async () => {
    const query = `
    query {
        degreesBySchool {
          features {
            geometry{
              coordinates
            }
            properties {
              id	
              name
              degreeCount
            }
          }
        }
      }
    `
    
    let result = await graphql(schema, query) 
    expect(result.errors).toBeFalsy()
    expect(result.data.degreesBySchool).toBeTruthy()
    expect(result.data.degreesBySchool.features[0].geometry.coordinates[1]).toBeTruthy()
    console.log(result)



  })