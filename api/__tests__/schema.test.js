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

  
it('gets degree counts by gender', async () => {
  const queryMen = `
    query {
      degreesBySchool(gender: men) {
        features {
          properties {
            degreeCount
          }
        }
      }
    }
  `
  
  let resultsMen = await graphql(schema, queryMen) 
  expect(resultsMen.errors).toBeFalsy()
  expect(resultsMen.data.degreesBySchool).toBeTruthy()

  const queryWomen = `
    query {
      degreesBySchool(gender: women) {
        features {
          properties {
            degreeCount
          }
        }
      }
    }
  `

  let resultsWomen = await graphql(schema, queryWomen) 

  const queryAll = `
    query {
      degreesBySchool(gender: all) {
        features {
          properties {
            degreeCount
          }
        }
      }
    }
  `
  let resultsAll = await graphql(schema, queryAll) 
  
  let degreesAll = resultsAll.data.degreesBySchool.features.reduce( (a,b) => {
    return a+b.degreeCount
  }, 0)

  let degreesMen = resultsMen.data.degreesBySchool.features.reduce( (a,b) => {
    return a+b.degreeCount
  }, 0)

  let degreesWomen = resultsWomen.data.degreesBySchool.features.reduce( (a,b) => {
    return a+b.degreeCount
  }, 0)

  expect(degreesAll).toEqual(degreesMen + degreesWomen)
})