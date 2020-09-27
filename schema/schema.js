const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = require("graphql");

const users = [
  { id: "1", firstName: "Alex", age: 20 },
  { id: "2", firstName: "Anna", age: 23 },
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) => users.find((user) => user.id === args.id),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
