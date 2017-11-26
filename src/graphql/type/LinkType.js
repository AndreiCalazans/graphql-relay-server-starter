import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

export const LinkType = new GraphQLObjectType({
  name: 'Link',
  fields: () => ({
    id: globalIdField('Link'),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: obj => obj._id,
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Title of each link',
      resolve: obj => obj.title,
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Url to each link',
      resolve: obj => obj.url,
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'When it was created',
      resolve: obj => obj.createdAt,
    },
  }),
});
