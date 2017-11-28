import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, connectionArgs } from 'graphql-relay';

import LinkConnection from '../connection/LinkConnection';
import { Link } from '../../model';
import { LinkLoader } from '../loader/LinkLoader';
import { ErrorType } from '../type/ErrorType';

export const DeleteLink = mutationWithClientMutationId({
  name: 'DeleteLink',

  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    error: {
      type: ErrorType,
      resolve: obj => obj.error ? { message: obj.error } : null,
    },
    deletedId: {
      type: GraphQLString,
      resolve: obj => obj.id,
    },
    AllLinks: {
      type: LinkConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: async (obj, args) => LinkLoader.loadWithConnection(args),
    },
  },
  mutateAndGetPayload: async (payload) => {
    const deletedLink = await Link.findByIdAndRemove(payload.id);

    return deletedLink ? {
      id: '23',
    } :
      {
        error: 'Nothing was deleted',
      };
  },
});

