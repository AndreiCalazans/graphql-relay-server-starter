import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { graphql } from 'graphql';
import { introspectionQuery , printSchema} from 'graphql/utilities';
import  fs from 'fs';

import {MongoClient} from 'mongodb';


let app = express();
app.use(express.static('public'));
// mongo sets up local db by the name you pass to it.

(async () => {

    // pass db to the graphql schema
   try { 
        let db = await MongoClient.connect('mongodb://localhost:27017/graphql_tutorial');
       let schema = Schema(db);


    app.use('/graphql', GraphQLHTTP({
        schema,
        graphiql: true
    }))

    app.listen(5000 , () => console.log('You are live on server 5000'));


    // Generate schema.json
    let json = await graphql(schema, introspectionQuery);
    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
            if (err) throw err;

        console.log('JSON schema created');
    });
   } catch(e) {
     console.log(e);  
   }
})();





