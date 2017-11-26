import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

// import { LinkConnection } from '../connection/LinkConnection';
import { Link } from '../../model';
// import { LinkType } from '../type/LinkType';
// import { LinkLoader } from '../loader/LinkLoader';
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
    // linkEdge: {
    //   type: LinkConnection.edgeType,
    //   resolve: obj => ({
    //     node: obj.ops[0],
    //     cursor: obj.insertedId,
    //   }),
    // },
    // Link: {
    //   type: LinkType,
    //   description: 'Get a link by its id',
    //   args: {
    //     id: {
    //       type: GraphQLString,
    //     },
    //   },
    //   resolve: (obj, args) => LinkLoader.loadById(args.id),
    // },
  },

  mutateAndGetPayload: ({ title, url }) => new Link({
    title,
    url,
    createdAt: Date.now(),
  }).save(),
});
