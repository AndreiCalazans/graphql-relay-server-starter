import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import { LinkType } from '../type/LinkType';
import { LinkLoader } from '../loader/LinkLoader';

const { nodeField, nodeInterface } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Link') {
      return LinkLoader.load(id);
    }

    return null;
  },
  (obj) => {
    if (obj instanceof LinkLoader) {
      return LinkType;
    }
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
