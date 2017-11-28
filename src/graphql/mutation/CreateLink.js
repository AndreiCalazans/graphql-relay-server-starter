import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, connectionArgs, toGlobalId } from 'graphql-relay';

import LinkConnection from '../connection/LinkConnection';
import { Link } from '../../model';
import { LinkLoader } from '../loader/LinkLoader';
import { ErrorType } from '../type/ErrorType';

export const CreateLink = mutationWithClientMutationId({
  name: 'CreateLink',

  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    error: {
      type: ErrorType,
      resolve: obj => obj.error ? obj.error : null,
    },
    AllLinks: {
      type: LinkConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: async (obj, args) => LinkLoader.loadWithConnection(args),
    },
    linkEdge: {
      type: LinkConnection.edgeType,
      resolve: obj => ({
        node: obj,
        cursor: toGlobalId('Link', obj._id),
      }),
    },
  },

  mutateAndGetPayload: async ({ title, url }) => {
    const newLink = await new Link({
      title,
      url,
      createdAt: Date.now(),
    }).save();


    return newLink;
  },
});
