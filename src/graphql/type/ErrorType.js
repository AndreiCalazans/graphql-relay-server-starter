import { GraphQLObjectType, GraphQLString } from 'graphql';

export const ErrorType = new GraphQLObjectType({
  name: 'Error',
  description: 'Error information',
  fields: () => ({
    message: {
      type: GraphQLString,
      resolve: err => err.message,
    },
  }),
});
