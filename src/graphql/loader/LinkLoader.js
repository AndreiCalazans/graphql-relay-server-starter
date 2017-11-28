import { connectionFromArray } from 'graphql-relay';

import { Link } from '../../model';

export class LinkLoader {
  constructor(data) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.url = data.url;
    this.createdAt = data.createdAt;
  }

  static async load(id) {
    const data = {
      id,
    };

    return new LinkLoader(data);
  }

  static async loadById(id) {
    return Link.findById(id, (err, link) => {
      if (err) return err;

      return link;
    });
  }

  static async loadAll() {
    return Link.find({}, (err, links) => {
      if (err) return err;

      return links;
    });
  }

  static async loadWithConnection(args) {
    const links = await Link.find({}).sort({ createdAt: -1 });

    return connectionFromArray(links, args);
  }
}
