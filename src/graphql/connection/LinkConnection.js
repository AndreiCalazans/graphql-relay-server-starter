import { connectionDefinitions } from 'graphql-relay';

import { LinkType } from '../type/LinkType';

export default connectionDefinitions({
  name: 'Links',
  nodeType: LinkType,
});
