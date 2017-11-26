import express from 'express';
import GraphQLHTTP from 'express-graphql';
import mongoose from 'mongoose';

import { schema } from './schema';

const app = express();
app.use(express.static('public'));

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/graphql_tutorial');

    app.use('/graphql', GraphQLHTTP({
      schema,
      graphiql: true,
    }));

    app.listen(5000, () => console.log('You are live on server 5000'));
  } catch (e) {
    console.log(e);
  }
})();

