import { GraphQLObjectType } from 'graphql';

import { CreateLink } from '../mutation/CreateLink';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createLink: CreateLink,
  }),
});
