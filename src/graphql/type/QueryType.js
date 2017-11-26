import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeField } from '../interface/NodeInterface';

import { LinkType } from '../type/LinkType';
import { LinkLoader } from '../loader/LinkLoader';
import LinkConnection from '../connection/LinkConnection';


export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: NodeField,
    Link: {
      type: LinkType,
      description: 'Get a link by its id',
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args) => LinkLoader.loadById(args.id),
    },
    AllLinks: {
      type: LinkConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: async (obj, args) => LinkLoader.loadWithConnection(args),
    },
  }),
});
