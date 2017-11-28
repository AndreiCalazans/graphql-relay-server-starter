import { GraphQLObjectType } from 'graphql';

import { CreateLink } from '../mutation/CreateLink';
import { DeleteLink } from '../mutation/DeleteLink';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createLink: CreateLink,
    deleteLink: DeleteLink,
  }),
});
