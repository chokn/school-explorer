const { gql } = require('apollo-server');
const { GraphQLScalarType} = require('graphql')

const { getDegreesBySchool } = require('./models')
// GraphQL and GeoJson reference:
// https://medium.com/@brygrill/creating-a-geojson-featurecollection-type-for-graphql-352591451b4a

const typeDefs = `
  scalar Coordinates

  enum Gender {
    men
    women
    all
  }

  enum Degree {
    bachelors
    masters
    doctorate
    none
  }

  type PointGeometry {
    type: String!
    coordinates: Coordinates!
  }
  type PointProps {
    id: Int!
    lat: Float
    lon: Float
    name: String
    degreeCount: Int
  }
  type PointObject {
    type: String!
    geometry: PointGeometry
    properties: PointProps
  }
  type FeatureCollection {
    type: String!
    features: [PointObject]
  }
  type Query {
    degreesBySchool(
      gender: Gender = "all",
      minDegree: Degree,
      raceEthnicity: [String!]): FeatureCollection
  }
`;

const resolvers = {
    Coordinates: new GraphQLScalarType({
      name: 'Coordinates',
      description: 'A set of coordinates. x, y',
      parseValue(value) {
        return value;
      },
      serialize(value) {
        return value;
      },
      parseLiteral(ast) {
        return ast.value;
      },
    }),
    Query: {
      degreesBySchool(obj, args, context, info) {
        let features = getDegreesBySchool(args)
        return {
          type: "FeatureCollection",
          features
        }
      }
    },
  };

  module.exports = {
    typeDefs,
    resolvers
  }